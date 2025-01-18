import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthType } from './auth/decorators/auth-type.decorator';
import { RoutesAuthType } from './auth/enums/auth.enums';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @AuthType(RoutesAuthType.PUBLIC)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
