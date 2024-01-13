import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueId = uuidv4();
          const originalExtension = extname(file.originalname);
          const fileName = `${uniqueId}${originalExtension}`;
          return cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/plain') {
          return cb(new Error('Not a text file'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file) {
    const { originalname, filename } = file;
    return this.fileService.uploadFile(originalname, filename);
  }
}
