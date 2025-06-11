import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Task } from '../../entities/task/taskModel';
import { taskStorage } from '../../services/storage/taskStorage';
import { sortTasks } from '../../shared/utils/sortUtils';
import { useThemeColor } from '../../shared/lib/hooks/useThemeColor';
import Icon from '../../shared/ui/Icon';

export function useHomeScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortMode, setSortMode] = useState<'status_asc' | 'status_desc' | 'date_asc' | 'date_desc'>('status_asc');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const sortedTasks = sortTasks(tasks, sortMode);

    const backgroundColor = useThemeColor({}, 'background');
    const upBackgroundColor = useThemeColor({}, 'upBackground');
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');
    const pending = useThemeColor({}, 'pending');
    const in_progress = useThemeColor({}, 'in_progress');
    const done = useThemeColor({}, 'done');
    const canceled = useThemeColor({}, 'canceled');

    const router = useRouter();

    const statusGradientColors = {
        pending: pending,//orange
        in_progress: in_progress,// blue
        done: done,// green
        canceled: canceled,//red
    };

    const sortOptionsData = [
        { label: 'Status', value: 'status_asc', direction: 'up' },
        { label: 'Status', value: 'status_desc', direction: 'down' },
        { label: 'Date', value: 'date_asc', direction: 'up' },
        { label: 'Date', value: 'date_desc', direction: 'down' },
    ] as const;

    /*type SortOptionValue = typeof sortOptionsData[number]['value'];*/

    useFocusEffect(
        useCallback(() => {
            const loadTasks = async () => {
                const loaded = await taskStorage.getAll();
                setTasks(loaded);
            };
            loadTasks();
        }, [])
    );

    return {
        tasks,
        sortedTasks,
        sortOptionsData,
        sortMode,
        showSortDropdown,
        setSortMode,
        setShowSortDropdown,
        backgroundColor,
        upBackgroundColor,
        textColor,
        iconColor,
        statusGradientColors,
        router,
    };
}