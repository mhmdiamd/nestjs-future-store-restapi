import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PhotoProductService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  /**
   * Create Photo Product
   */

  public async createPhotoProduct(dto: any): Promise<any> {
    try{
      const uploadPhoto = await this.prisma.photoProduct.create({
        data: {
          id: randomUUID(),
          ...dto
        }
      })

      return uploadPhoto
    }catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code == 'P2002') throw new ConflictException('Product already have photo');
      }
      throw err 
    }
  }
}
