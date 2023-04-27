import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService){}

  /**
   * Create Store
   */

  async createStore(dto: CreateStoreDto) {
    try{
      const store = await this.prisma.store.create({
        data: {
          ...dto, id: randomUUID()
        }
      })

      return store
    }catch(err) {
      console.log(err)
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken!')
        }
      }
      throw err
    }
  }
}
