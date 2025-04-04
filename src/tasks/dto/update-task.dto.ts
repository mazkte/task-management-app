import { Status } from '../models/task-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  id: string;

  @IsNotEmpty({ message: `Property {0} is required` })
  description: string;

  @IsNotEmpty({ message: `Property {0} is required` })
  title: string;

  @IsEnum(Status, {
    message: 'Status must be PENDING, IN_PROGRESS, or COMPLETED',
  })
  state: string;
}
