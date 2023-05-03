import { ForbiddenException } from "@nestjs/common";
import { Request, Express } from "express";
import { extname } from "path";

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: any ) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new ForbiddenException('Only image files are allowed!'), false);
  }

  callback(null, true);
}

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: any
) => {
    const name = file.originalname.split('.')[0]
    const fileExtName = extname(file.originalname)

    const randomName = Array(4).fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join() 

    callback(null, `${name}-${randomName}${fileExtName}`)
}

export const changeAndSplitFieldPhoto = (images: any) => {
  const newFields = {}
  
  images.forEach((image : {id: string}, i: number) => {
    const field = `photo${i + 1}`
    newFields[field] = `${process.env.GOOGLE_DRIVE_PUBLIC_URL}${image.id}`
  })

  return newFields
}