import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Response } from 'express';
import { generateSlug } from 'src/common/slug-generator';

@Controller('stores')
export class StoreController {

  constructor(private readonly storeService: StoreService) {}

  @Post()
  async createStore(@Body() dto: CreateStoreDto, @Res() res: Response) {
    try{
      // Generate Slug
      const slug = generateSlug(dto.store_name, dto.id_user)
      // Create Store
      await this.storeService.createStore({...dto, slug})
      // Send response to client
      res.status(HttpStatus.CREATED).send({
        status: "Success",
        message: "Store Success Created!"
      })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }
}

