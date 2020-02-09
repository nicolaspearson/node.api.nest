import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export default class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @Length(1, 500)
  public readonly firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  public readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Length(1, 500)
  public readonly emailAddress: string;

  @ApiProperty()
  @IsString()
  @Length(6, 500)
  public readonly password: string;
}
