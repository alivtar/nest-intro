import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/Pagination.module';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    TagsModule,
    PaginationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env', '.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      validationSchema: environmentValidation,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          // entities: [User, Post],
          port: configService.get('database.port'),
          host: configService.get('database.host'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          synchronize: configService.get('database.synchronize'),
        };
      },
    }),
    TagsModule,
    MetaOptionsModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AppModule {}
