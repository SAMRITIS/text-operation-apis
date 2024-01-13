import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { TaskType } from 'src/enums/task-type.enum';

export class CreateTaskDto {
  @IsEnum(TaskType, { message: 'Invalid task type' })
  type: TaskType;

  @ValidateIf((o) => o.type === TaskType.TOP_K_WORD)
  @IsNotEmpty()
  kWord: number;

  @IsString()
  @IsNotEmpty()
  fileUuid: string;
}
