import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TodoRepository } from 'src/repositories/todo.repository';
import { v4 } from 'uuid';
import { BaseEntity } from './base.entity';

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ customRepository: () => TodoRepository, tableName: 'Todo' })
export class Todo extends BaseEntity {
  @PrimaryKey({
    type: 'uuid',
    onCreate: () => v4(),
  })
  id!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Enum({
    items: () => TodoStatus,
    nullable: false,
  })
  status!: TodoStatus;

  [EntityRepositoryType]?: TodoRepository;
}
