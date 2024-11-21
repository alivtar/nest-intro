import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          type: 'postgres',
          port: 5432,
          host: 'localhost',
          username: 'postgres',
          password: 'superuser',
          database: 'nestjs-blog',
          entities: [User, Post],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
