import { Controller, Get, UseGuards, Res, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthData } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserSerialized } from './types';


@Controller('users')
export class UserController {

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@AuthData() user: User, @Res() res: Response) {
    res.status(HttpStatus.OK).send({
      status: "Success",
      data: new UserSerialized(user)
    })
  }
}
