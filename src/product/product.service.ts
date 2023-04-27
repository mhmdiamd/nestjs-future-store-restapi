import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  
  /**
   * Create Product
   */

  async createProduct(productDto: CreateProductDto) {
    // const product = await this.prisma
  }
  
}
