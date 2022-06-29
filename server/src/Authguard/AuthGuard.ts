import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { UserService } from '../Users/user.service';
import { userRoles } from '../userRole';
import { ROLES_KEY } from '../../utils/roles.decorator';
import { config } from 'dotenv';
config();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log("cookies at auth: ",request.cookies)

    try {
      const token = request.headers.jwt;
      // console.log('token', token);
      var decoded = jwt.verify(token.toString(), process.env.JSONSecret);
      // console.log('decoded', decoded);
      const userId = decoded['id'];
      return this.isAccessAllowed(userId, request, context);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  private async isAccessAllowed(userId, request, context) {
    const user = await this.userService.getUser(userId);
    request.user = user;
    const requiredRoles = this.reflector.getAllAndOverride<userRoles>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // console.log(requiredRoles, user);
    console.log(user)
    return requiredRoles && requiredRoles.includes(user.role);
  }
}