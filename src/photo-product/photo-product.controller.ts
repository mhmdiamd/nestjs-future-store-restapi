import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PhotoProductService } from './photo-product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { GoogleDriveService } from 'src/gcp/google-drive/google-drive.service';
import { diskStorage } from 'multer';
import { changeAndSplitFieldPhoto ,editFileName, imageFileFilter } from './utils';

@Controller('photo-products')
export class PhotoProductController {
  constructor(
    private readonly photoProductService: PhotoProductService,
    private readonly googleDriveService: GoogleDriveService
    ){}

  /**
   * Create Photo Product
   */

  @Post()
  // Image interceptor
  @UseInterceptors(FilesInterceptor('image', 4, {
    storage: diskStorage({
      filename: editFileName,
    }),
    fileFilter: imageFileFilter
  }))
  public async createPhotoProduct(
    @UploadedFiles(
      // Images Pipe Validation
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          // Max file is 2mb
          maxSize: 1000 * 2000 
        })
        .build({
           // Error Handler
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) files: Array<Express.Multer.File>,
    @Body('id_product') id_product: string,
    @Res() res: Response
  ): Promise<void> {
    try{
      // Upload all file to drive
      const uploadFiles = await Promise.all(files.map(async (file) => await this.googleDriveService.uploadPhotoToGDrive(file)))

      // Recreate Field photo {photo1: string, photo2: string, etc...}
      const newImagesField = changeAndSplitFieldPhoto(uploadFiles)
      const payloadDto : {
        id_product: string,
      } = {
        id_product: id_product,
        ...newImagesField
      }
      // Save to DB
      const response = await this.photoProductService.createPhotoProduct(payloadDto)
      res.status(HttpStatus.CREATED).send({
        status: "Success",
        data: response
      })
    }catch(err){
      res.status(err.response.statusCode).send(err.response)
    }
  }
}
