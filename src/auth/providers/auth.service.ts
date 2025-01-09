import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
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
    return { signedIn: 'success' };
  }
}
