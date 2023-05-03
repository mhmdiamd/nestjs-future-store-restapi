import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IsUserMiddleware } from './middlewares';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(IsUserMiddleware)
      .forRoutes({
        path: "users/edit/:id",
        method: RequestMethod.PATCH
      })
  }
}
