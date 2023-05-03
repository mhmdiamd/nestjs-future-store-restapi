import { Global, Module } from "@nestjs/common";
import { GoogleDriveService } from "./google-drive.service";

@Global()
@Module({
  providers: [GoogleDriveService]
})

export class GoogleDriveModule{}