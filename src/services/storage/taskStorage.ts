import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../../entities/task/taskModel';

const TASKS_INDEX_KEY = 'task_index';

export const taskStorage = {
    async getAll(): Promise<Task[]> {
        const indexJson = await AsyncStorage.getItem(TASKS_INDEX_KEY);
        const ids: string[] = indexJson ? JSON.parse(indexJson) : [];

        const tasks = await Promise.all(
            ids.map(id => AsyncStorage.getItem(`task:${id}`))
        );

        return tasks.map(json => json ? JSON.parse(json) : null).filter(Boolean) as Task[];
    },

    async add(task: Task) {
        await AsyncStorage.setItem(`task:${task.id}`, JSON.stringify(task));

        const indexJson = await AsyncStorage.getItem(TASKS_INDEX_KEY);
        const ids: string[] = indexJson ? JSON.parse(indexJson) : [];

        if (!ids.includes(task.id)) {
            ids.push(task.id);
            await AsyncStorage.setItem(TASKS_INDEX_KEY, JSON.stringify(ids));
        }
    },

    async update(task: Task){
        await AsyncStorage.setItem(`task:${task.id}`, JSON.stringify(task));
    },

    async remove(id: string){
        const indexJson = await AsyncStorage.getItem(TASKS_INDEX_KEY);
        let ids: string[] = indexJson ? JSON.parse(indexJson) : [];

        ids = ids.filter(taskId => taskId !== id);
        await AsyncStorage.setItem(TASKS_INDEX_KEY, JSON.stringify(ids));
        await AsyncStorage.removeItem(`task:${id}`);
    }
};