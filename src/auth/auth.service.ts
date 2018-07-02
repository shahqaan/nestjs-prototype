import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor() {}

  async createToken(userObj) {
    const jwtPayload = {
      id: userObj.id,
    };
    const user: JwtPayload = jwtPayload;
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }
}