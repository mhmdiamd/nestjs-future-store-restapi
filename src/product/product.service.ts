import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  
  /**
   * Create Product
   */

  async createProduct(productDto: CreateProductDto, id_store: string) {
    const product = await this.prisma.product.create({
      data: {
        ...productDto, id_store, id: randomUUID()
      }
    })

    return product
  }
  
}
