import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    // create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect it to data source
    await queryRunner.connect();
    // start transaction plus operations for that transaction
    await queryRunner.startTransaction();

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        newUsers.push(newUser);
      }
      await queryRunner.manager.save(newUsers);

      // if successful commit
      await queryRunner.commitTransaction();
    } catch (err) {
      // if unsuccessful rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // release the connection
      await queryRunner.release();
    }

    return newUsers;
  }
}
