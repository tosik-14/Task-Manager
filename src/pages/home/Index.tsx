import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskStorage } from '../../shared/lib/storage/taskStorage';
import { Task } from '../../entities/task/taskModel';
import { Stack, useRouter } from 'expo-router';
import {getStatusLabel} from "../../features/taskStatus/lib/getStatusLabel";
import AddTaskIcon from '../../shared/assets/images/AddTaskIcon';
import { useThemeColor } from '../../shared/lib/hooks/useThemeColor';
import {globalStyles} from "@/src/shared/styles/globalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { sortTasks } from './utils/sortUtils';
import SortIcon from '../../shared/assets/images/SortIcon';
import UpArrowIcon from '../../shared/assets/images/UpArrowIcon';
import DownArrowIcon from "@/src/shared/assets/images/DownArrowIcon";

export default function HomeScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const router = useRouter();
    const [sortMode, setSortMode] = useState<'status_asc' | 'status_desc' | 'date_asc' | 'date_desc'>('status_asc')
    const sortedTasks = sortTasks(tasks, sortMode);
    const [showSortDropdown, setShowSortDropdown] = useState(false);


    const backgroundColor = useThemeColor({}, 'background');
    const upBackgroundColor = useThemeColor({}, 'upBackground');
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');
    const pending = useThemeColor({}, 'pending');
    const in_progress = useThemeColor({}, 'in_progress');
    const done = useThemeColor({}, 'done');
    const canceled = useThemeColor({}, 'canceled');

    const statusGradientColors = {
        pending: pending,//оранжевый
        in_progress: in_progress,// голубой
        done: done,// зелёный
        canceled: canceled,//красный
    };

    const sortOptions = [
        { label: 'Status', value: 'status_asc', icon: <UpArrowIcon width={16} height={16} color={textColor} /> },
        { label: 'Status', value: 'status_desc', icon: <DownArrowIcon width={16} height={16} color={textColor} /> },
        { label: 'Date', value: 'date_asc', icon: <UpArrowIcon width={16} height={16} color={textColor} /> },
        { label: 'Date', value: 'date_desc', icon: <DownArrowIcon width={16} height={16} color={textColor} /> },
    ];


    useFocusEffect(
        useCallback(() => {
            const loadTasks = async () => {
                const loaded = await taskStorage.getAll();
                setTasks(loaded);
            };

            loadTasks();
        }, [])
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'My tasks',
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: useThemeColor({}, 'background'),
                        fontFamily: 'Montserrat-Bold',
                    },
                    headerTintColor: useThemeColor({}, 'tint'),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => setShowSortDropdown(prev => !prev)}
                            style={styles.sortButton}
                        >
                            <SortIcon width={20} height={20} color={iconColor}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => router.push('/task/task_view')}
                        >
                            <AddTaskIcon width={20} height={20} color={iconColor}/>
                            {/*<Text style={[styles.title, globalStyles.fontB16, { color: textColor }]}>Cjhn</Text>*/}
                        </TouchableOpacity>
                    ),
                }}

            />



            <View style={[styles.container, {backgroundColor}]}>
                {showSortDropdown && (
                    <View style={[styles.sortDowndrop, {
                        position: 'absolute',
                        backgroundColor: upBackgroundColor,
                    }]}>
                        {sortOptions.map(({ label, value, icon }) => (
                            <TouchableOpacity
                                key={value}
                                onPress={() => {
                                    setSortMode(value as any);
                                    setShowSortDropdown(false);
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}
                            >
                                {icon}
                                <Text style={[globalStyles.fontR14, { color: textColor, marginLeft: 6 }]}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <FlatList
                    data={sortedTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: '/task/task_view', params: { id: item.id } })}
                        >
                            <View style={[styles.taskCard, { backgroundColor: upBackgroundColor, overflow: 'hidden' }]}>

                                <LinearGradient
                                    colors={statusGradientColors[item.status]}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0.5, y: 0.5 }}
                                    style={styles.linearGradientStyle}
                                />

                                    <View style={styles.taskHeader}>
                                        <Text style={[styles.title, globalStyles.fontB16, { color: textColor }]}>{item.title}</Text>
                                        <Text style={[styles.status, globalStyles.fontR14,  { color: textColor }]}>{getStatusLabel(item.status)}</Text>
                                    </View>

                                    <Text style={[globalStyles.fontR14, { color: textColor }]}>
                                        {new Date(item.dueDate).toLocaleString('en-EN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Text>

                            </View>

                        </TouchableOpacity>
                    )}
                />

            </View>
        </>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    sortDowndrop: {
        top: 0,
        left: 16,
        borderRadius: 6,
        padding: 10,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 1,
    },
    linearGradientStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    taskCard: {
        marginHorizontal: 16,
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },

    title: {
        flex: 1,
    },

    status: {
        marginLeft: 8,
    },

    addButton: {
        padding: 8,
        borderRadius: 100,
        marginRight: 12,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortButton: {
        padding: 8,
        borderRadius: 100,
        marginLeft: 12,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
});