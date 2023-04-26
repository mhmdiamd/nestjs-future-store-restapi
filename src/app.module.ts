import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoriesModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
