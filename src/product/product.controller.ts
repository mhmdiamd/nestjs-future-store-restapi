import { Controller, Post, Body, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthData } from 'src/auth/decorator';
import { UserAuth } from 'src/auth/types';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto, 
    @AuthData() user: UserAuth,
    @Res() res: Response
  ) {
    const id_store = user.store.id
    const newProduct = await this.productService.createProduct(productDto, id_store)

    res.status(HttpStatus.CREATED).send({
      status: "Success",
      data: newProduct
    })
  }
}
