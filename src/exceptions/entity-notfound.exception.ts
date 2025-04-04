import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotfoundException extends HttpException {
  constructor(_entityId: string) {
    super('Entity with id: ' + _entityId + ' not found.', HttpStatus.NOT_FOUND);
  }
}
