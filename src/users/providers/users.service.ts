import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly createManyUsersProvider: UsersCreateManyProvider,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async getAll() {
    const value = this.configService.get<string>('S3_BUCKET');
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

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    return await this.usersRepository.save(newUser);
  }

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return await this.createManyUsersProvider.createManyUsers(
      createManyUsersDto,
    );
  }
}
