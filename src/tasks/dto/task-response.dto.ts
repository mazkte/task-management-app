export class TaskResponseDto {
  id: string;
  title: string;
  userId?: string;
  description?: string;
  dueDate?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  state: string;

  constructor(task: any) {
    console.log({ task });
    this.id = task._id.toString();
    this.userId = task.userId;
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.state = task.status;
  }
}

export function buildTaskResponse(task: any) {
  const instance: TaskResponseDto = {
    id: task._id.toString(),
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    state: task.status,
  };
  return instance;
}

export function buildShortTaskResponse(task: any) {
  const instance: TaskResponseDto = {
    id: task._id.toString(),
    title: task.title,
    state: task.status,
  };
  return instance;
}
