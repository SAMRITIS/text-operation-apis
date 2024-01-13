import { UUID } from 'crypto';
import { TaskType } from '../../../src/enums/task-type.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from '../file/file.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => File, (file) => file.tasks)
  @JoinColumn()
  file: File;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  name: TaskType;

  @Column()
  uuid: UUID;

  @Column({ nullable: true })
  kWord: number;

  @Column()
  result: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
