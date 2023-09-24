import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TodoStatus } from 'src/entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class DeleteTodoDto {
  @IsNotEmpty()
  @IsUUID(4)
  todoId!: string;
}

export class GetTodosParamsDto {
  @IsOptional()
  @IsUUID(4)
  nextTodoId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  nextDateCreated?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}

export class UpdateTodoStatusParamsDto {
  @IsNotEmpty()
  @IsUUID(4)
  todoId!: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  title?: string;
}

export class GetTodoMetricsParamsDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}
