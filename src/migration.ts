import { EntityCaseNamingStrategy, MikroORM } from '@mikro-orm/core';
import 'dotenv/config';

(async () => {
  const orm = await MikroORM.init({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgresql',
    driverOptions: {
      connection: {
        ssl: true,
      },
    },
    namingStrategy: EntityCaseNamingStrategy,
  });

  const generator = orm.getSchemaGenerator();
  const dump = await generator.getUpdateSchemaSQL({
    safe: true,
    wrap: true,
  });
  console.log('Potential Updates to be done', dump);

  await orm.close(true);
})();
