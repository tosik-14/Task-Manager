import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
/*import { v4 as uuidv4 } from 'uuid';*/
import uuid from 'react-native-uuid';
import { Task, TaskStatus} from '../../entities/task/taskModel';
import { taskStorage } from '../../services/storage/taskStorage';

export async function addTask(data: {
    title: string;
    description?: string;
    dueDate: string;
    location?: string;
    status?: TaskStatus;
}) {
    if (!data.title || !data.dueDate) {
        throw new Error('Fill the title and the date');
    }

    const newTask: Task = {
        id: String(uuid.v4()),
        title: data.title,
        description: data.description || '',
        dueDate: new Date(data.dueDate).toISOString(),
        location: data.location || '',
        status: data.status || 'pending',
        createdAt: new Date().toISOString(),
    };

    try {
        await taskStorage.add(newTask);

    } catch {
        throw new Error('Failed to save task');
    }
}

