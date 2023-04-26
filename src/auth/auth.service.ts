import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private prisma : PrismaService,
    private config : ConfigService
  ){}

  async register(dto: AuthRegisterDto): Promise<any>{
    // Hashing password
    const hash = await argon.hash(dto.password)
    // Delete Password for change to new password hash
    delete dto.password
    // Store to DB

    try{
      const newUser = await this.prisma.user.create({
        data: {
          ...dto, hash
        }
      })

      delete newUser.hash
      return newUser
    }catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken!')
        }
      }

      throw err
    }
    
  }

}
