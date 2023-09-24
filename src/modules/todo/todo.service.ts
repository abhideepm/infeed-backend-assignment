import { Injectable } from '@nestjs/common';
import { TodoStatus } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repositories/todo.repository';
import { UpdateTodoDto } from './dtos/todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(title: string) {
    const todo = this.todoRepository.create({
      title,
      status: TodoStatus.IN_PROGRESS,
    });

    await this.todoRepository.nativeInsert(todo);
  }

  async getTodos(nextTodoId?: string, nextDateCreated?: Date, limit = 10) {
    const todos = await this.todoRepository.find(
      {
        ...(nextTodoId && nextDateCreated
          ? {
              $or: [
                {
                  createdAt: {
                    $gt: nextDateCreated,
                  },
                },
                {
                  createdAt: {
                    $eq: nextDateCreated,
                  },
                  id: {
                    $gt: nextTodoId,
                  },
                },
              ],
            }
          : {}),
        deletedAt: null,
      },
      {
        orderBy: {
          createdAt: 'DESC',
          id: 'DESC',
        },
        limit,
        fields: ['id', 'status', 'title'],
      },
    );

    return {
      todos,
      paginationParams: {
        nextTodoId: todos.at(-1)?.id,
        nextDateCreated: todos.at(-1)?.createdAt,
      },
    };
  }

  async updateTodo(todoId: string, updateBody: UpdateTodoDto) {
    await this.todoRepository.nativeUpdate(
      {
        id: todoId,
      },
      updateBody,
    );
  }

  async deleteTodoById(todoId: string) {
    await this.todoRepository.nativeUpdate(
      { id: todoId },
      {
        deletedAt: new Date(),
      },
    );
  }

  async getTodoMetrics(startDate?: Date, endDate?: Date) {
    const todos = await this.todoRepository.count(
      {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      {
        groupBy: ['status'],
      },
    );
    console.log('todos', todos);
  }
}
