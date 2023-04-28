import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IsSellerMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')
    const payload = this.jwtService.verify(token[1], {
      secret: this.config.get('JWT_SECRET')
    })

    if(payload.is_seller){
      return next()
    }

    throw new ForbiddenException('Access denied, you are not seller!')
  }
}