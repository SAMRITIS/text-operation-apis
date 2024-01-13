import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskServcie: TaskService) {}

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.taskServcie.create(task);
  }

  @Get('/:taskUuid')
  get(
    @Param('taskUuid')
    taskUuid: `${string}-${string}-${string}-${string}-${string}`,
  ): Promise<Task> {
    return this.taskServcie.get(taskUuid);
  }
}
