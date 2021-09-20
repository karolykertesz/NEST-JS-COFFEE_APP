import { IsOptional, IsPositive } from "class-validator";
export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  limit: number;
  offset: number;
}
