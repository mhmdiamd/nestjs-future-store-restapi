import { Module } from '@nestjs/common';
import { PhotoProductController } from './photo-product.controller';
import { PhotoProductService } from './photo-product.service';
import { GoogleDriveService } from 'src/gcp/google-drive/google-drive.service';

@Module({
  controllers: [PhotoProductController],
  providers: [PhotoProductService, GoogleDriveService],
})
export class PhotoProductModule {}
