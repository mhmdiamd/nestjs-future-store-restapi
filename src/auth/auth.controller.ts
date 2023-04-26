import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthRegisterDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService : AuthService){}

  @Post('register')
  async register(@Body() dto: AuthRegisterDto, @Res() res: Response) {
    try{
      const data = await this.authService.register(dto)
      res.status(HttpStatus.OK).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }
  
}
