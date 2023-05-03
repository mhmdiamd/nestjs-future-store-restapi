import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { IsSellerMiddleware } from './product/middlewares';
import { JwtModule } from '@nestjs/jwt';
import { PhotoProductModule } from './photo-product/photo-product.module';
import { GoogleDriveModule } from './gcp/google-drive/google-drive.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    CategoriesModule, PrismaModule, AuthModule, UserModule, ProductModule, StoreModule, PhotoProductModule, GoogleDriveModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  // Implements middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsSellerMiddleware)
      .forRoutes({
        path: `products`,
        method:  RequestMethod.POST
      })
  }

}
