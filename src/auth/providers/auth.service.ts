import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // dow we have a user with given email?
    const user = await this.usersService.findOneUserByEmail(signInDto.email);
    // if not: throw an error (user does not exist)
    if (!user) {
      throw new NotFoundException('Could not find user with given email');
    }
    // check the password correctness
    const isPasswordCorrect = await this.hashingProvider.compareHash(
      signInDto.password,
      user.password,
    );
    // if wrong: throw wrong credentials error
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    // return confirmation (JWT)

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
      },
    );

    return { accessToken };
  }
}
