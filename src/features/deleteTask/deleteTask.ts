import { taskStorage } from '../../services/storage/taskStorage';

export async function deleteTask(taskId: string): Promise<void> {
    try {
        await taskStorage.remove(taskId);
        console.log(`Task with the id=${taskId} was deleted`);
    } catch (error) {
        console.error('Error while deleting task:', error);
        throw new Error('Failed to delete task');
    }
}
