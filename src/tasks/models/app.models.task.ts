export interface Task {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  lastModifiedDate?: string;
  state: string;
}
