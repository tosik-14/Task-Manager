import { TaskStatus } from '../../../entities/task/taskModel';

export const nextStatus: Record<TaskStatus, TaskStatus> = {
    pending: 'in_progress',
    in_progress: 'done',
    done: 'canceled',
    canceled: 'pending',
};