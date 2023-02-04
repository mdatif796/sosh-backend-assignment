import { NestMiddleware } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export class JwtStrategyCheckMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }
    const access_token = req.headers.authorization.split(' ')[1];
    try {
      const decodedUser = await jwt.verify(
        access_token,
        process.env.JWT_SECRET,
      );
      if (!decodedUser) {
        throw new UnauthorizedException();
      }
      req.user = decodedUser;

      console.log('access_token: ', access_token);
      next();
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}
