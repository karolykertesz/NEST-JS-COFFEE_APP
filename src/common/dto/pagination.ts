import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
export class Pagination {
  @IsOptional()
  @Type(()=> Number)
  limit: number;
  offset:number;
}
