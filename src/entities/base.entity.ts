import { Property } from '@mikro-orm/core';

export class BaseEntity {
  @Property({ type: 'date', onCreate: () => 'now()' })
  createdAt?: Date = new Date();

  @Property({ type: 'date', onUpdate: () => 'now()', onCreate: () => 'now()' })
  updatedAt?: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}
