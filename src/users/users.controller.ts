import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

// http:localhost:3000/users
@Controller('users')
export class UsersController {
  @Get('/:id/:fullname?')
  public getUsers(
    @Param() params: { id: string; fullname: string },
    @Query() query: { page: number; pageSize: number },
  ) {
    console.log('params', params);
    console.log('query', query);
    return 'You sent a request to get all the users.';
  }

  @Post()
  public createUser(
    @Body() body: { firstName: string; lastName: string; email: string },
  ) {
    console.log('body', body);
    return 'You want to create a user, hah?';
  }
}
