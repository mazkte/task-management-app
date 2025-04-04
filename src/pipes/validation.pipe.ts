import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);

    const errors = await validate(object);

    const jsonErrors: any[] = [];
    if (errors.length > 0) {
      errors.forEach((err) => {
        for (const key in err.constraints) {
          jsonErrors.push(
            this.formatString(err.constraints[key], err.property),
          );
        }
      });
      throw new HttpException(jsonErrors, HttpStatus.BAD_REQUEST, {
        description: 'Bad request',
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatString(template: string, ...values: string[]): string {
    return template.replace(
      /{(\d+)}/g,
      (match, index) => values[index] || match,
    );
  }
}
