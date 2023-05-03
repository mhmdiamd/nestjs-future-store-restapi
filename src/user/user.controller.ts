import { Controller, Get, UseGuards, Res, HttpStatus, UseInterceptors, ClassSerializerInterceptor, Patch, Body, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthData } from 'src/auth/decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { UserEntity } from './types';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  /**
   * Get Current User
   */

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@AuthData() user: User, @Res() res: Response) {
    res.status(HttpStatus.OK).send({
      status: "Success",
      data: user
    })
  }

  /**
   * Update User By Id
   */

  @UseGuards(JwtAuthGuard)
  @Patch('edit/:id')
  async updateUserById(
    @Param('id') idUser: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response
  ): Promise<any> {
    try {
      // update data body to the service
      const user: UpdateUserDto = await this.userService.updateUserById(dto, idUser)
   
      // Send Response to client
      res.status(HttpStatus.OK).send({
        status: "Success",
        data: user
      })

      // be Honest i miss the serialization, this is so difficult and make me almost say "ANJING"
    } catch (err) {
      return res.status(err.response.statusCode).send(err.response)
    }
  }
}
