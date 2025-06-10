import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../../../entities/task/taskModel';

const TASKS_KEY = 'tasks';

export const taskStorage = {
    async getAll(): Promise<Task[]> {
        const json = await AsyncStorage.getItem(TASKS_KEY);
        return json ? JSON.parse(json) : [];
    },

    async saveAll(tasks: Task[]) {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    },

    async add(task: Task) {
        const tasks = await this.getAll();
        tasks.push(task);
        await this.saveAll(tasks);
    },

    async update(updatedTask: Task) {
        const tasks = await this.getAll();
        const newTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        await this.saveAll(newTasks);
    },

    async remove(id: string) {
        const tasks = await this.getAll();
        const filtered = tasks.filter(t => t.id !== id);
        await this.saveAll(filtered);
    },
};