import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export default class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Length(1, 500)
  public emailAddress: string;

  @ApiProperty()
  @IsString()
  @Length(6, 500)
  public password: string;
}
