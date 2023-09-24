import {
  EntityManager,
  EntityName,
  EntityRepository,
  IDatabaseDriver,
} from '@mikro-orm/core';
import { AbstractSqlConnection } from '@mikro-orm/knex';

export class BaseRepository<T extends object> extends EntityRepository<T> {
  constructor(
    protected readonly _em: EntityManager<
      IDatabaseDriver<AbstractSqlConnection>
    >,
    protected readonly entityName: EntityName<T>,
  ) {
    super(_em, entityName);
  }
}
