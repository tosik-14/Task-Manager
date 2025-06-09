import { taskStorage } from '../../shared/lib/storage/taskStorage';

export async function deleteTask(taskId: string): Promise<void> {
    try {
        await taskStorage.remove(taskId);
        console.log(`Задача с id=${taskId} удалена`);
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        throw new Error('Не удалось удалить задачу');
    }
}
