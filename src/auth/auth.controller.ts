import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @Get()
  //   public getAuth() {}
}
