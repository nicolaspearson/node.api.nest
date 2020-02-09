import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export default class CreateHeroDto {
  @ApiProperty()
  @IsString()
  @Length(1, 500)
  public readonly name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  public readonly identity: string;

  @ApiProperty()
  @IsString()
  @Length(1, 500)
  public readonly hometown: string;

  @ApiProperty()
  @IsNumber()
  public readonly age: number;
}
