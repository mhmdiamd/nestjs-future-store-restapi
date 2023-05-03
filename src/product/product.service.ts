import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { randomUUID } from 'crypto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

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

  /**
   * Update Product by Id
   */

  async updateProductById(dto: UpdateProductDto, id_product: string): Promise<Product> {
    try{
      const product: Product = await this.prisma.product.update({
        where: {
          id: id_product
        },
        data: dto,
        // Include store entity relation
        include: {
          store: true
        }
      })

      return product
    }catch(err) {
      throw err 
    }
  }
  
}
