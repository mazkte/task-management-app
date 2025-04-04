import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
    }),
    MongooseModule.forRoot(
      'mongodb://mazkte:t3st@localhost:27017/?authMechanism=SCRAM-SHA-256',
      {
        dbName: 'task-mgnt',
        retryAttempts: 1,
        retryDelay: 5,
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => console.log('connected'));
          connection.on('open', () => console.log('open'));
          connection.on('disconnected', () => console.log('disconnected'));
          connection.on('reconnected', () => console.log('reconnected'));
          connection.on('disconnecting', () => console.log('disconnecting'));

          return connection;
        },
      },
    ),
  ],
})
export class AppModule {}
