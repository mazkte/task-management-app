import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskResponseDto } from '../dto/task-response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly appService: TasksService) {}

  @Get()
  async findAll(): Promise<TaskResponseDto[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.appService.findById(id);
  }

  @Post()
  async create(@Body() reqTaskDto: CreateTaskDto) {
    return this.appService.create(reqTaskDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() reqTaskDto: UpdateTaskDto) {
    return this.appService.update(id, reqTaskDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.appService.delete(id);
  }
}
