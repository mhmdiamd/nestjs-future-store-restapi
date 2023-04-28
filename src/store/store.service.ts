import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { UpdateStoreDto } from './dto/update-store.dto';

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

  /**
   * Update Store ById
   */

  async updateStore(id: string, dto: UpdateStoreDto) {
    try{
      const updateStore = await this.prisma.store.update({
        where: {
          id: id
        },
        data: {
          ...dto
        }
      })

      
      return updateStore
    }catch(err) {
      console.log(err)
    }
  
  }
}
