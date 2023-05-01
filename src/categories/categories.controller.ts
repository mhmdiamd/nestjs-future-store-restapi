import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Req, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Request, Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  create(@Body('name') name:string ) {
    return this.categoriesService.create(name);
  }

  @Get()
  async findAll(@Res() res: Response): Promise<any>{
    try{
      const data = await this.categoriesService.findAll();
      res.status(HttpStatus.OK).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body('name') name: string,
    @Res() res: Response
  ) {
    try{
      const data = await this.categoriesService.update(+id, name);
      res.status(HttpStatus.OK).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number, 
    @Res() res: Response
  ) {
    try{
      const data = await this.categoriesService.remove(+id);
      res.status(HttpStatus.OK).send({ status: "Success", data: data })
    }catch(err) {
      res.status(err.response.statusCode).send(err.response)
    }
  }
}
