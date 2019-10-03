import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export default class UpdateHeroDto {
  @ApiModelProperty()
  @IsNumber()
  public readonly id: number;

  @ApiModelProperty()
  @IsString()
  @Length(1, 500)
  public readonly name: string;

  @ApiModelProperty()
  @IsString()
  @Length(1, 500)
  public readonly identity: string;

  @ApiModelProperty()
  @IsString()
  @Length(1, 500)
  public readonly hometown: string;

  @ApiModelProperty()
  @IsNumber()
  public readonly age: number;
}
