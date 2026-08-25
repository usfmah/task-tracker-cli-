export interface Task {
  id: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;   // ISO string
  updatedAt: string;
}

