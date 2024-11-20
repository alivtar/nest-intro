import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getAll() {
    return await this.usersRepository.find();
  }

  public async getUserById(userId: number) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      // todo: Handle the existing user error
    }

    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
  }
}
