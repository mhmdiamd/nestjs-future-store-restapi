import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config : ConfigService,
    private prisma : PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    }); 
  }

  async validate(payload: {
    sub: string,
    email: string,
  }) {
    const user = await this.prisma.user.findUnique({
      where : {
        id: payload.sub
      },
       include: {
        store: true
       }
    })

    delete user.hash
    delete user.store?.id_user
    return user
  }
}