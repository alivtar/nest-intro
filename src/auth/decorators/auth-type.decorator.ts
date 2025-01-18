import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { RoutesAuthType } from '../enums/auth.enums';

export const AuthType = (routeAuthType: RoutesAuthType) =>
  SetMetadata(AUTH_TYPE_KEY, routeAuthType);
