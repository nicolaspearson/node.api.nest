import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export default class RegisterUserDto {
  @ApiModelProperty()
  @IsString()
  @Length(1, 500)
  public readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  @Length(1, 500)
  public readonly lastName: string;

  @ApiModelProperty()
  @IsString()
  @IsEmail()
  @Length(1, 500)
  public readonly emailAddress: string;

  @ApiModelProperty()
  @IsString()
  @Length(6, 500)
  public readonly password: string;
}
