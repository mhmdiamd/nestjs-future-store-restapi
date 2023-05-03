import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from './types';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma : PrismaService
  ){}

  /**
   * Update User By Id
   */

  async updateUserById(
    dto: UpdateUserDto, 
    id_user: string
  ): Promise<UpdateUserDto> {
    try{
      const dataUpdate = await this.prisma.user.update({
        where: {
          id: id_user
        }, 
        data: dto
      })

      delete dataUpdate.hash
      return dataUpdate
    }catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code == 'P2002'){
          throw new ForbiddenException('Email has been taken!')
        }
      }
      throw err
    }
  }

}
