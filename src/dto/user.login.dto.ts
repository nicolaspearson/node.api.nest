import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export default class LoginUserDto {
  @ApiModelProperty()
  @IsString()
  @IsEmail()
  @Length(1, 500)
  public emailAddress: string;

  @ApiModelProperty()
  @IsString()
  @Length(6, 500)
  public password: string;
}
