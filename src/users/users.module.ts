import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { databaseConfig } from 'src/config/database.config';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(profileConfig),
    ConfigModule.forFeature(databaseConfig),
  ],
  exports: [UsersService],
})
export class UsersModule {}
