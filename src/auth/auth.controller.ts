import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthRegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthData } from './decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService : AuthService){}

  @Post('register')
  async register(@Body() dto: AuthRegisterDto, @Res() res: Response) {
    try{
      const data = await this.authService.register(dto)
      res.status(HttpStatus.CREATED).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }

  @Post('login')
  async login(@Body() dto: AuthLoginDto, @Res() res: Response) {
    try{
      const data = await this.authService.login(dto)
      res.status(HttpStatus.OK).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }
  
}
