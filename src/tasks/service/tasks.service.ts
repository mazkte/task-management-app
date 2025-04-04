import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { EntityNotfoundException } from '../../exceptions/entity-notfound.exception';
import { UpdateTaskDto } from '../dto/update-task.dto';
import {
  buildShortTaskResponse,
  buildTaskResponse,
  TaskResponseDto,
} from '../dto/task-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Task } from '../../schemas/task.schema';

@Injectable()
export class TasksService {
  private taskList: Task[] = new Array<Task>();

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskModel.find().lean();
    return tasks.map((t) => buildShortTaskResponse(t));
  }

  async create(reqTaskDto: CreateTaskDto) {
    const newTask: Task = {
      title: reqTaskDto.title,
      description: reqTaskDto.description,
      createdDate: new Date(),
      createdBy: 'mazkte',
      dueDate: new Date(),
      status: 'INITIATED',
      deleted: false,
    };
    const { _id } = await this.taskModel.create(newTask);
    return { id: _id };
  }

  async findById(id: string) {
    const existingTask = await this.taskModel.findById(id).exec();
    if (!existingTask) {
      throw new EntityNotfoundException(id);
    }

    return buildTaskResponse(existingTask);
  }

  async update(id: string, reqTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new EntityNotfoundException(id);
    }

    const updateTask: Task = {
      title: reqTaskDto.title,
      description: reqTaskDto.description,
      createdDate: new Date(),
      createdBy: 'mazkte',
      dueDate: new Date(),
      deleted: false,
      status: reqTaskDto.state,
    };

    await this.taskModel.updateOne(updateTask).exec();
  }

  delete(id: string) {
    const { number } = new Promise((resolve) => {
      setTimeout(() => {
        resolve({number:Math.random()*100})
      } , 2000)
    });

    console.log(number);

    this.taskModel.deleteOne(id);

    if (index === -1) {
      throw new EntityNotfoundException(id);
    }

    this.taskList.splice(index, 1);**/
    console.log(id);
  }
}
