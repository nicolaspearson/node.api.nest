import { IsNumber, IsString, Length } from 'class-validator';

export default class UpdateHeroDto {
  @IsNumber()
  public readonly id: number;

  @IsString()
  @Length(1, 500)
  public readonly name: string;

  @IsString()
  @Length(1, 500)
  public readonly identity: string;

  @IsString()
  @Length(1, 500)
  public readonly hometown: string;

  @IsNumber()
  public readonly age: number;
}
