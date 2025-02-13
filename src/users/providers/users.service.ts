import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import profileConfig from '../config/profile.config';
import { databaseConfig } from 'src/config/database.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly createManyUsersProvider: UsersCreateManyProvider,
    private readonly hashingProvider: HashingProvider,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async getAll() {
    const value = this.configService.get<string>('S3_BUCKET');
    console.log('aaa', this.profileConfiguration);
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

  public async findOneUserByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Could not find user.',
      });
    }
  }
}
