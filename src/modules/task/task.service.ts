import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FileService } from '../file/file.service';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { TaskType } from 'src/enums/task-type.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private fileService: FileService,
  ) {}

  async create(
    task: CreateTaskDto,
  ): Promise<{ message: string; taskUuid: string } | any> {
    const uuid = uuidv4();
    const { fileUuid, type, kWord, ...taskObj } = task;
    const file = await this.fileService.getByUuid(fileUuid);

    if (!file) {
      throw new HttpException(
        { message: 'File not found', errorCode: 'FILE_NOT_FOUND' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const filePath = path.join(__dirname, '../../../../uploads', file.name);
    let result = null;
    if (type === TaskType.COUNT_WORD) {
      result = await this.countWords(filePath);
    }
    if (type === TaskType.COUNT_UNIQUE_WORD) {
      result = await this.countUniqueWords(filePath);
    }
    if (type === TaskType.TOP_K_WORD) {
      result = await this.findTopKWords(filePath, kWord);
    }
    await this.taskRepository.save({
      fild: file.id,
      name: type,
      uuid,
      result,
      kWord,
      ...taskObj,
    });
    return { message: 'Successfully created task', taskUuid: uuid };
  }

  async countWords(filePath: string): Promise<number> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: stream });

    let wordCount = 0;

    for await (const line of rl) {
      const words = line.split(/\s+/);
      wordCount += words.length;
    }

    return wordCount;
  }

  async countUniqueWords(filePath: string): Promise<number> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: stream });

    const uniqueWords = new Set<string>();

    for await (const line of rl) {
      const words = line.split(/\s+/);
      words.forEach((word) => uniqueWords.add(word));
    }

    return uniqueWords.size;
  }

  async findTopKWords(
    filePath: string,
    k: number,
  ): Promise<{ [key: string]: number }> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: stream });

    const wordFrequency: Map<string, number> = new Map();

    for await (const line of rl) {
      const words = line.split(/\s+/);
      words.forEach((word) => {
        const cleanedWord = word.replace(/[^\w\s]/g, '').toLowerCase();

        if (cleanedWord !== '') {
          const count = wordFrequency.get(cleanedWord) || 0;
          wordFrequency.set(cleanedWord, count + 1);
        }
      });
    }

    const sortedWordFrequency = [...wordFrequency.entries()].sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      } else {
        return a[0].localeCompare(b[0]);
      }
    });

    return Object.fromEntries(sortedWordFrequency.slice(0, k));
  }

  get(
    taskUuid: `${string}-${string}-${string}-${string}-${string}`,
  ): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        uuid: taskUuid,
      },
    });
  }
}
