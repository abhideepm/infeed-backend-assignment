import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { TodoStatus } from 'src/entities/todo.entity';
import { TodoRepository } from 'src/repositories/todo.repository';
import { UpdateTodoDto } from './dtos/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly em: EntityManager,
  ) {}

  async createTodo(
    title: string,
    description?: string,
    status = TodoStatus.OPEN,
  ) {
    const todo = this.todoRepository.create({
      title,
      description,
      status,
    });

    await this.todoRepository.persistAndFlush(todo);
  }

  async getTodos(nextTodoId?: string, nextDateCreated?: Date, limit = 10) {
    const todos = await this.todoRepository.find(
      {
        ...(nextTodoId && nextDateCreated
          ? {
              $or: [
                {
                  createdAt: {
                    $lte: nextDateCreated,
                  },
                },
                {
                  createdAt: {
                    $eq: nextDateCreated,
                  },
                  id: {
                    $lte: nextTodoId,
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
        limit: limit + 1,
        fields: ['id', 'status', 'title', 'description', 'createdAt'],
      },
    );

    return {
      todos: todos.slice(0, limit),
      paginationParams: {
        nextTodoId: todos.at(limit)?.id ?? null,
        nextDateCreated: todos.at(limit)?.createdAt ?? null,
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

  async getTodoMetrics(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 0).toISOString();
    const todos = await this.em.execute<
      {
        status: TodoStatus;
        count: number;
      }[]
    >(
      `
        SELECT 
          status, 
          COUNT(*)::INT AS count
        FROM "Todo"
        WHERE "createdAt" BETWEEN ? AND ?
        GROUP BY status
      `,
      [startDate, endDate],
    );

    return {
      metrics: todos.reduce(
        (acc, { status, count }) => ({
          ...acc,
          [status]: count,
        }),
        {},
      ),
      month,
      year,
    };
  }
}
