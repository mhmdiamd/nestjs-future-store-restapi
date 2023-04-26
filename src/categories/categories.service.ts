import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma : PrismaService){}

  // Create Categories
  async create(name: string) {
    const categories = await this.prisma.category.create({
      data: {
        name: name
      }
    })
    return categories
  }

  async findAll() {
    
    // Get Categories from DB
    const categories = await this.prisma.category.findMany()
    // Throw Error when categories not found!
    if(!categories || categories.length == 0) throw new NotFoundException('Categories not found!')
    // Send Categories to controller
    return categories
  }

  // Update Category By Id
  async update(id: number, name: string) {
    try{
      const data = await this.prisma.category.update({
        where: {
          id: id
        },
        data:  {
          name: name
        }
      })

      return data
    }catch(err) {
      console.log(err)
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2025'){
          throw new NotFoundException(`Category with id ${id} not found!`)
        }
      }
      throw err
    }
  }

  // Remove Category By Id
  async remove(id: number) {
    try{
      const data = await this.prisma.category.delete({
        where: {
          id: id
        }
      })

      return data
    }catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === 'P2025'){
          throw new NotFoundException(`Category with id ${id} not found!`)
        }
      }
      throw err
    }
  }
}
