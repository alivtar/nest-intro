import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/PaginationProvider';

@Module({
  providers: [PaginationProvider],
  imports: [],
  exports: [PaginationProvider],
  controllers: [],
})
export class PaginationModule {}
