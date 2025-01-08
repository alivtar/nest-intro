import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginateQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    options?: FindManyOptions<T>,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      ...options,
      take: paginateQueryDto.limit,
      skip: (paginateQueryDto.page - 1) * paginateQueryDto.limit,
    });

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginateQueryDto.limit);

    const url = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, url);
    const baseURL = `${newUrl.origin}${newUrl.pathname}`;

    console.log('baseURL', baseURL);

    const nextPage: Paginated<T>['links']['next'] =
      paginateQueryDto.page === totalPages
        ? null
        : `${baseURL}?page=${paginateQueryDto.page + 1}&limit=${paginateQueryDto.limit}`;

    const previousPage: Paginated<T>['links']['previous'] =
      paginateQueryDto.page === 1
        ? null
        : `${baseURL}?page=${paginateQueryDto.page - 1}&limit=${paginateQueryDto.limit}`;

    return {
      data: results,
      meta: {
        currentPage: paginateQueryDto.page,
        itemsPerPage: paginateQueryDto.limit,
        totalItems,
        totalPages,
      },
      links: {
        current: `${baseURL}?page=${paginateQueryDto.page}&limit=${paginateQueryDto.limit}`,
        first: `${baseURL}?page=1&limit=${paginateQueryDto.limit}`,
        last: `${baseURL}?page=${totalPages}&limit=${paginateQueryDto.limit}`,
        next: nextPage,
        previous: previousPage,
      },
    };
  }
}

// page = 1
// 0 --> 10  // skip = 0

// page = 2
// 10 --> 20 // skip = 10 ((page - 1) * pageSize)

// page = 3
// 20 --> 30 // skip = 20

// page = 4
// 30 --> 40 // skip = 30

// -----------

//  totalItems = 35

// limit: 8 --> totalPages = totalItems % limit === 0 ? totalItems / limit : Math.floor(totalItems / limit) + 1
