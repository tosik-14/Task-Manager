export type TaskStatus = 'pending' | 'in_progress' | 'done' | 'canceled';

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    location: string;
    status: TaskStatus;
    createdAt: string;
}