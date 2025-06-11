import { taskStorage } from '../../services/storage/taskStorage';
import { Task } from '../../entities/task/taskModel';

export async function updateTask(updatedTask: Task): Promise<void> {
    try {
        await taskStorage.update(updatedTask);
    } catch {
        throw new Error('Failed to upgrade task');
    }
}

