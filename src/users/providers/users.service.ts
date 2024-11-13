import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      fullName: 'Ali Baghban',
      email: 'ali.angori007@gmail.com',
    },
    {
      id: 2,
      fullName: 'John Doe',
      email: 'john@doe.com',
    },
    {
      id: 3,
      fullName: 'Jane Doe',
      email: 'jane@doe.com',
    },
  ];

  public getAll() {
    return this.users;
  }

  public getUserById(userId: number) {
    return this.users.find((user) => user.id === userId);
  }

  public createUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
  }
}
