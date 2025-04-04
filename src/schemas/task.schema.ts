import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop()
  status: string;

  @Prop()
  createdDate: Date;

  @Prop()
  createdBy: string;

  @Prop()
  deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
