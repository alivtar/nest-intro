import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  page?: number = 1;
}
