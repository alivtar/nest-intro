import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    TagsModule,
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
          // entities: [User, Post],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
