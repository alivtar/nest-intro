import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { RoutesAuthType } from '../enums/auth.enums';
import { AccessTokenGuard } from './access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  private static readonly defaultAuthType = RoutesAuthType.BEARER;

  private authTypeGuardMap: Record<RoutesAuthType, CanActivate> = {
    [RoutesAuthType.BEARER]: this.accessTokenGuard,
    [RoutesAuthType.PUBLIC]: {
      canActivate() {
        return true;
      },
    },
  };

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authType: RoutesAuthType =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuard.defaultAuthType;

    const guard = this.authTypeGuardMap[authType];

    return guard.canActivate(context);
  }
}
