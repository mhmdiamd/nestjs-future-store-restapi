import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ConfigService } from '@nestjs/config';
import { IAuthJwt } from 'src/auth/types';

@Injectable()
export class IsSellerMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    // Get Token
    const token = req.headers.authorization.split(' ')
    // Decode token and get the transcript data
    const payload: IAuthJwt = this.jwtService.verify(token[1], {
      secret: process.env.JWT_SECRET
    })
    // Next if user is seller
    if(payload.is_seller){
      return next()
    }

    // Throw Error if the use not Seller
    throw new ForbiddenException('Access denied, you are not seller!')
  }
}