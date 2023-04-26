import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule, PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
