import { Controller, Get, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthData } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UserController {

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@AuthData() user: User, @Res() res: Response) {
    res.status(HttpStatus.OK).send({
      status: "Success",
      data: user
    })
  }
}
