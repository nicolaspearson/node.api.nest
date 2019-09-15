import { IsEmail, IsString, Length } from 'class-validator';

export default class RegisterUserDto {
  @IsString()
  @Length(1, 500)
  public readonly firstName: string;

  @IsString()
  @Length(1, 500)
  public readonly lastName: string;

  @IsString()
  @IsEmail()
  @Length(1, 500)
  public readonly emailAddress: string;

  @IsString()
  @Length(6, 500)
  public readonly password: string;
}
