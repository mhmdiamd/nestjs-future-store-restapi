import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { AuthLoginDto } from './dto/auth-login.dto';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt'
import { StoreService } from 'src/store/store.service';
import { generateSlug } from 'src/common/slug-generator';

@Injectable()
export class AuthService {

  constructor(
    private prisma : PrismaService,
    private config : ConfigService,
    private jwtService: JwtService,
    private storeService: StoreService
  ){}

  // Register Service
  async register(dto: AuthRegisterDto): Promise<any>{
    // Hashing password
    const hash = await argon.hash(dto.password)
    // Delete Password for change to new password hash
    delete dto.password
    // Store to DB

    try{
      const newUser = await this.prisma.user.create({
        data: {
          id: randomUUID(),
          name: dto.name,
          email: dto.email,
          hash: hash,
        }
      })

      // If is Seller is true, lets create data store
      if(dto.is_seller) {
        // Generate Slug for store
        const slug =  generateSlug(dto.store_name, newUser.id)
        // Create Store
        const store = await this.storeService.createStore({
          id_user: newUser.id,
          id_category: Number(dto.id_category),
          store_name: dto.store_name,
          slug
        })

        delete newUser.hash

        return {
          user: newUser,
          store: store
        }
      }

      delete newUser.hash
      return newUser

    }catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken!')
        }
      }
      throw err
    }
  }

  // Login Service
  async login(dto: AuthLoginDto): Promise<any> {
    try{
      // Find data by email first
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email
        }
      })
      // Throw Error when email not found
      if(!user) throw new ForbiddenException('Email is Incorrect!')

      // Matches password 
      const pwMatch = await argon.verify(user.hash, dto.password)
      // Throw Error when password not match
      if(!pwMatch) throw new ForbiddenException('Credentials Incorrect!')

      delete user.hash

      // Genereate Access Token
      const access_token = await this.signToken({
        id: user.id,
        email: user.email,
        photo: user.photo
      })

      return {...user, access_token}
    }catch(err) {
      console.log(err)
      throw err
    }
   
  }

  async signToken(data: {
    id: string,
    email: string,
    photo: string
  }): Promise<string> {
    const payload = {
      sub: data.id,
      email: data.email,
      photo: data.photo
    }
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "30m",
      secret: this.config.get("JWT_SECRET")
    })
    return access_token
  }

}
