import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import BaseService from '@app/base/base.service';
import LoginUserDto from '@app/dto/user.login.dto';
import RegisterUserDto from '@app/dto/user.register.dto';
import User from '@app/entities/user.entity';
import { EnvService } from '@app/env';
import {
  BadRequestException,
  InternalException,
  UnauthorizedException,
} from '@app/exceptions';
import CookieUser from '@app/interfaces/cookie-user';
import Token from '@app/interfaces/token';
import TokenPayload from '@app/interfaces/token-payload.interface';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    super(userRepository);
  }

  public preSaveHook(user: User): void {
    // Executed before the save repository call
    delete user.id;
  }

  public preUpdateHook(user: User) {
    // Executed before the update repository call
    delete user.updatedAt;
  }

  public preDeleteHook(user: User) {
    // Executed before the delete repository call
    user.deletedAt = new Date();
  }

  public preResultHook(user: User) {
    // Executed before the result is returned
    delete user.password;
    delete user.createdAt;
    delete user.deletedAt;
    delete user.updatedAt;
  }

  async findOne(emailAddress: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { emailAddress } });
  }

  public async register(registerUserDto: RegisterUserDto): Promise<CookieUser> {
    if (
      await this.userRepository.findOne({
        emailAddress: registerUserDto.emailAddress,
      })
    ) {
      throw new BadRequestException(
        'That email address is already registered!',
      );
    }
    const hashedPassword = await this.encryptPassword(registerUserDto.password);
    const user = await this.userRepository.save({
      ...registerUserDto,
      password: hashedPassword,
    });

    this.preResultHook(user);

    // Create a token for the user
    const token = this.createToken({
      id: user.id,
      email: user.emailAddress,
    });
    const cookie = this.createCookie(token);
    return {
      cookie,
      token,
      user,
    };
  }

  public async login(loginUserDto: LoginUserDto): Promise<CookieUser> {
    try {
      let userResult: User;
      try {
        // Fetch the user from the database
        userResult = await this.userRepository.findOne({
          where: {
            emailAddress: loginUserDto.emailAddress,
            enabled: true,
          },
        });
      } catch (error) {
        // User not found / disabled
        throw new UnauthorizedException('Invalid credentials supplied');
      }

      // Validate the provided password
      const valid = await this.validatePassword(
        userResult.password,
        loginUserDto.password,
      );
      if (!valid) {
        throw new UnauthorizedException(
          'Invalid email address / password supplied',
        );
      }

      this.preResultHook(userResult);

      // Create a token for the user
      const token = this.createToken({
        id: userResult.id,
        email: userResult.emailAddress,
      });
      const cookie = this.createCookie(token);
      return {
        cookie,
        token,
        user: userResult,
      };
    } catch (error) {
      if (error && (error.isBoom || error instanceof HttpException)) {
        throw error;
      }
      throw new InternalException(error);
    }
  }

  public createToken(tokenPayload: TokenPayload): Token {
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: EnvService.get().JWT_EXPIRATION,
    });
    const token: Token = new Token();
    token.accessToken = accessToken;
    return token;
  }

  public createCookie(token: Token): string {
    return `Authorization=${token.accessToken}; HttpOnly; Max-Age=${
      EnvService.get().JWT_EXPIRATION
    }`;
  }

  public async encryptPassword(password: string): Promise<string> {
    try {
      const salt: string = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  }

  private async validatePassword(
    dbPassword: string,
    password: string,
  ): Promise<boolean> {
    try {
      const result = await bcrypt.compare(password, dbPassword);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
