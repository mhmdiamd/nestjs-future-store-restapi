import { ConfigService } from "@nestjs/config";
import {google} from 'googleapis'
import { Express } from "express";
import * as fs from 'fs'

export class GoogleDriveService {
  constructor(
    private config: ConfigService,
    // Google Drive auth Scopes
    private googleDriveScopes = [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
      ' https://www.googleapis.com/auth/drive.scripts',
      'https://www.googleapis.com/auth/drive.metadata'
    ],

    private serviceAccount = {
      "type": process.env.GOOGLE_DRIVE_TYPE,
      "project_id": process.env.GOOGLE_DRIVE_PROJECT_ID,
      "private_key_id": process.env.GOOGLE_DRIVE_PRIVATE_KEY_ID,
      "private_key": process.env.GOOGLE_DRIVE_PRIVATE_KEY,
      "client_email": process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      "client_id": process.env.GOOGLE_DRIVE_CLIENT_ID,
      "auth_uri": process.env.GOOGLE_DRIVE_AUTH_URI,
      "token_uri": process.env.GOOGLE_DRIVE_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.GOOGLE_DRIVE_AUTH_PROVIDER,
      "client_x509_cert_url": process.env.GOOGLE_DRIVE_CLIENT_URL
    },

    // Google Drive Auth Credentials
    public auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(JSON.stringify(serviceAccount)),
      scopes: googleDriveScopes
    }),

    // Account services
    private googleDriveService = google.drive({
      version: 'v3',
      auth: auth,
    })
  ) {}


  /**
   * Upload Photo
   */

  public async uploadPhotoToGDrive(photo: Express.Multer.File) {

    const fileMetaData = {
      name: photo.filename,
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER]
    }

    const media = {
      mimeType: photo.mimetype,
      body: fs.createReadStream(photo.path)
    }

    const response = await this.googleDriveService.files.create({
      requestBody: fileMetaData,
      media: media,
      fields: 'id'  
    })

    return response.data
  } 
}