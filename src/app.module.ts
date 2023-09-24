import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TodoModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        dbName: config.get('DB_NAME'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        user: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        type: 'postgresql',
        namingStrategy: EntityCaseNamingStrategy,
      }),
    }),
  ],
})
export class AppModule {}
