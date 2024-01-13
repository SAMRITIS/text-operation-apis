import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async uploadFile(
    originalname: string,
    filename: string,
  ): Promise<{ message: string; taskUuid: string } | any> {
    const uuid = uuidv4();
    await this.fileRepository.save({
      name: filename,
      prevName: originalname,
      uuid: uuid,
    });
    return { uuid, message: 'Successfully file uploaded' };
  }

  getByUuid(uuid: string): Promise<File> {
    return this.fileRepository.findOne({
      where: {
        uuid,
      },
    });
  }
}
