import { IsString, IsArray } from "class-validator";
export class CreateCoffeeDto {
  @IsString()
  readonly name: string;
@IsString({each: true})
  readonly flavours: string[];
  @IsString()
  readonly location: string;
}
