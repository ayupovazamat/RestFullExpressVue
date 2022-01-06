import {IsNumber, IsString} from "class-validator";

export class ObjectDto {
  @IsNumber()
  id: number;

  @IsString()
  price: number;

  /*@IsString()
  description: string;*/
}
