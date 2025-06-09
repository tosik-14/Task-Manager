import { taskStorage } from '../../shared/lib/storage/taskStorage';
import { Task } from '../../entities/task/taskModel';

export async function updateTask(updatedTask: Task): Promise<void> {
    try {
        await taskStorage.update(updatedTask);
    } catch {
        throw new Error('Не удалось обновить задачу');
    }
}

