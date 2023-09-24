import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateTodoDto,
  DeleteTodoDto,
  GetTodoMetricsParamsDto,
  GetTodosParamsDto,
  UpdateTodoDto,
  UpdateTodoStatusParamsDto as UpdateTodoParamsDto,
} from './dtos/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() { title }: CreateTodoDto) {
    return this.todoService.createTodo(title);
  }

  @Delete(':todoId')
  deleteTodoById(@Param() { todoId }: DeleteTodoDto) {
    return this.todoService.deleteTodoById(todoId);
  }

  @Patch(':todoId')
  updateTodo(
    @Param() { todoId }: UpdateTodoParamsDto,
    @Body() updateBody: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(todoId, updateBody);
  }

  @Get()
  getTodos(@Param() { nextDateCreated, nextTodoId, limit }: GetTodosParamsDto) {
    return this.todoService.getTodos(nextTodoId, nextDateCreated, limit);
  }

  @Get('metrics')
  getTodoMetrics(@Param() { startDate, endDate }: GetTodoMetricsParamsDto) {
    return this.todoService.getTodoMetrics(startDate, endDate);
  }
}
