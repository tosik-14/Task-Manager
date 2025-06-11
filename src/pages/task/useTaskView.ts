import {useEffect, useState} from "react";
import {
    Alert,
    Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {Task, TaskStatus} from "@/src/entities/task/taskModel";
import {useThemeColor} from "@/src/shared/lib/hooks/useThemeColor";
import {taskStorage} from "@/src/services/storage/taskStorage";
import {updateTask} from "@/src/features/updateTask/update";
import {addTask} from "@/src/features/addTask/add";

export function useTaskView() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState<TaskStatus>('pending');
    const [task, setTask] = useState<Task | null>(null);

    const [showPicker, setShowPicker] = useState(false);
    const [dateObject, setDateObject] = useState<Date>(new Date());
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

    const backgroundColor = useThemeColor({}, 'background');
    const upBackgroundColor = useThemeColor({}, 'upBackground');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'borderColor');

    const router = useRouter();

    const { id } = useLocalSearchParams();
    const isEditMode = !!id;

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false); //for android
        if (selectedDate) {

            const current = new Date(dateObject);

            if (pickerMode === 'date') {
                current.setFullYear(selectedDate.getFullYear());
                current.setMonth(selectedDate.getMonth());
                current.setDate(selectedDate.getDate());
            } else if (pickerMode === 'time') {
                current.setHours(selectedDate.getHours());
                current.setMinutes(selectedDate.getMinutes());
            }

            setDateObject(current);
            setDueDate(current.toISOString());
        }
    };

    useEffect(() => {
        const loadTask = async () => {
            if (isEditMode) {
                const allTasks = await taskStorage.getAll();
                const existingTask = allTasks.find((t) => t.id === id);
                if (existingTask) {
                    setTitle(existingTask.title);
                    setDescription(existingTask.description);
                    setDueDate(existingTask.dueDate);
                    setLocation(existingTask.location);
                    setStatus(existingTask.status);
                    setTask(existingTask);
                }
            }
        };

        loadTask();
    }, [id]);

    const handleAddTask = async () => {
        if (!title || !dueDate) {
            Alert.alert('Error', 'Fill in the title and date');
            return;
        }
        try {
            if (isEditMode && task) {
                const updatedTask = {
                    ...task,
                    title,
                    description,
                    dueDate,
                    location,
                    status,
                };
                await updateTask(updatedTask);
            } else {
                await addTask({ title, description, dueDate, location, status });
            }
            router.back();
        } catch (e: any) {
            Alert.alert('Error', e.message || 'Oops');
        }
    };

    const statusColors = {
        pending: '#FFF4E5',
        in_progress: '#E6F4FF',
        done: '#E6F9ED',
        canceled: '#FFE9E9',
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        location,
        setLocation,
        status,
        setStatus,
        task,
        showPicker,
        setShowPicker,
        dateObject,
        pickerMode,
        setPickerMode,
        backgroundColor,
        upBackgroundColor,
        textColor,
        borderColor,
        onChangeDate,
        handleAddTask,
        statusColors,
        router,
        isEditMode,
    };
}