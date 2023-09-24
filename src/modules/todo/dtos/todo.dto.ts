import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateBy,
} from 'class-validator';
import { TodoStatus } from 'src/entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoStatus)
  @IsOptional()
  status?: TodoStatus;
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

  @IsOptional()
  @IsString()
  description?: string;
}

export class GetTodoMetricsParamsDto {
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => {
    if (typeof value !== 'string') {
      return value;
    }
    return value.split('/').map((v) => +v);
  })
  @IsNumber({ allowNaN: false }, { each: true })
  @ValidateBy({
    validator: (value: number[]) => {
      if (value.length !== 2) {
        throw new BadRequestException('Invalid query params');
      }
      const [month, year] = value;

      if (month < 1 || month > 12) {
        throw new BadRequestException('Invalid month');
      }

      if (year < 1) {
        throw new BadRequestException('Invalid year');
      }

      return true;
    },
    name: 'monthYear',
  })
  monthYear!: number[];
}
