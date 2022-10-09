import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
// import { AppUser } from 'src/app-user/app-user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    request.token = await this.validateToken(request.headers.authorization);
    const userRoles: string[] = request.token.role;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // if (!roles) {
    //   request.user = getRepository(AppUser).findOne({
    //     email: request.token.email,
    //     isActive: true,
    //     isDeleted: false,
    //   });
    //   return true;
    // }

    console.log(this.findCommonElement(userRoles, roles));

    if (!this.findCommonElement(roles, userRoles)) {
      throw new UnauthorizedException();
    }

    // request.user = getRepository(AppUser).findOne({
    //   email: request.token.email,
    //   isActive: true,
    //   isDeleted: false,
    // });
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }
    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      if (error.name == 'TokenExpiredError') {
        throw new UnauthorizedException(error.name);
      }
      const message = 'Token error: ' + (error.message || error.name);
      throw new UnauthorizedException(message);
    }
  }

  findCommonElement(array1, array2): boolean {
    // Loop for array1
    for (let i = 0; i < array1.length; i++) {
      // Loop for array2
      for (let j = 0; j < array2.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (array1[i] === array2[j]) {
          // Return if common element found
          return true;
        }
      }
    }

    // Return if no common element exist
    return false;
  }
}
