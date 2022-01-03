import { IsNumber, IsString } from "class-validator";

export class ObjectDto {
    @IsNumber()
    id: number;

    @IsNumber()
    price: number;
}
