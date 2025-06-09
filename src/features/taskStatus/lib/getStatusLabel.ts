import { TaskStatus } from '../../../entities/task/taskModel';

export function getStatusLabel(status: TaskStatus): string {
    switch (status) {
        case 'pending':
            return 'Pending';
        case 'in_progress':
            return 'In process';
        case 'done':
            return 'Done';
        case 'canceled':
            return 'Canceled';
        default:
            return 'Unknown';
    }
}