import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { IAuthJwt } from "src/auth/types";

@Injectable()
export class IsUserMiddleware implements NestMiddleware{
  constructor(
    private jwtService : JwtService,
    private configService : ConfigService
  ){}

  use(req: Request, res: Response, next: NextFunction) {
    // Get Token
    const token = req.headers.authorization.split(' ')
    
    // Decode token and get the transcript data
    const payload: IAuthJwt = this.jwtService.verify(token[1], {
      secret: process.env.JWT_SECRET
    })

    // Next if the current user and id user in params is match
    if(payload.sub == req.params.id){
      return next()
    }
   
    // Throw Error if the use not Seller
    throw new ForbiddenException('Access denied!')
  }
}