import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    Platform,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { addTask } from "../../features/addTask/add";
import { updateTask} from "../../features/updateTask/update";
import { getStatusLabel } from "../../features/taskStatus/lib/getStatusLabel";
import { deleteTask } from "../../features/deleteTask/deleteTask";
import { nextStatus } from "../../features/taskStatus/lib/nextStatus";
import { Task, TaskStatus } from "../../entities/task/taskModel";
import { taskStorage } from '../../shared/lib/storage/taskStorage'; //
import { useThemeColor } from '../../shared/lib/hooks/useThemeColor'; // хук, который возвращает цвет
import { globalStyles } from '../../shared/styles/globalStyles';  // некоторые глобальные стили

export default function TaskView() {
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

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false); //для android
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

    const router = useRouter();

    const { id } = useLocalSearchParams();
    const isEditMode = !!id;

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

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Task',
                    headerStyle: {
                        backgroundColor: useThemeColor({}, 'background'),
                        fontFamily: 'Montserrat-Bold',
                    },
                    headerTintColor: useThemeColor({}, 'tint'),
                }}
            />
            <View style={{flex: 1, backgroundColor}}>
                <ScrollView contentContainerStyle={[styles.container, {backgroundColor}]}>
                    <Text style={[globalStyles.fontB16, {color: textColor}]}>Title</Text>
                    <TextInput style={[styles.input, globalStyles.fontR16, {borderColor: borderColor, backgroundColor: upBackgroundColor, color: textColor}]} value={title} onChangeText={setTitle}/>

                    <Text style={[globalStyles.fontB16, {color: textColor}]}>Description</Text>
                    <TextInput
                        style={[styles.input, globalStyles.fontR16, {borderColor: borderColor, backgroundColor: upBackgroundColor, color: textColor, height: 80}]}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <Text style={[globalStyles.fontB16, {color: textColor}]}>Location</Text>
                    <TextInput style={[styles.input, globalStyles.fontR16, {borderColor: borderColor, backgroundColor: upBackgroundColor, color: textColor}]} value={location} onChangeText={setLocation}/>

                    <View style={styles.dateTimeRow}>

                        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={[globalStyles.fontB16, {color: textColor, marginBottom: 12}]}>Date</Text>
                            <TouchableOpacity onPress={() => {
                                setShowPicker(true);
                                setPickerMode('date');
                            }} style={[styles.dateTimeButton, {borderColor: borderColor, backgroundColor: upBackgroundColor}]}>
                                <Text style={[styles.dateText, {color: textColor}]}>
                                    {(isEditMode && dueDate ? new Date(dueDate) : dateObject).toLocaleDateString('en-EN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={[globalStyles.fontB16, {color: textColor, marginBottom: 12}]}>Time</Text>
                            <TouchableOpacity onPress={() => {
                                setShowPicker(true);
                                setPickerMode('time');
                            }} style={[styles.dateTimeButton, {borderColor: borderColor, backgroundColor: upBackgroundColor}]}>
                                <Text style={[styles.dateText, {color: textColor}]}>
                                    {(isEditMode && dueDate ? new Date(dueDate) : dateObject).toLocaleTimeString('en-EN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showPicker && Platform.OS === 'ios' && (
                            <Modal transparent animationType="fade">
                                <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
                                    <View style={styles.modalBackground}>
                                        <View style={styles.pickerContainer}>
                                            <DateTimePicker
                                                value={isEditMode && dueDate ? new Date(dueDate) : dateObject}
                                                mode={pickerMode}
                                                is24Hour={true}
                                                display="spinner"
                                                onChange={onChangeDate}
                                                style={{ backgroundColor: backgroundColor }}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Modal>
                        )}

                        {showPicker && Platform.OS === 'android' && (
                            <DateTimePicker
                                value={isEditMode && dueDate ? new Date(dueDate) : dateObject}
                                mode={pickerMode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDate}
                            />
                        )}

                        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Text style={[globalStyles.fontB16, {color: textColor, marginBottom: 12}]}>Status</Text>
                            <TouchableOpacity
                                onPress={() => setStatus(nextStatus[status])}
                                style={[styles.statusBox, {backgroundColor: statusColors[status]}]}
                            >

                                <Text style={styles.statusLabel}>{getStatusLabel(status)}</Text>

                            </TouchableOpacity>
                        </View>

                    </View>


                    <Button title={isEditMode ? "Save" : "Add task"} onPress={handleAddTask}/>


                </ScrollView>
            </View>

            {task && (
                <TouchableOpacity onPress={async () => {
                    await deleteTask(task.id);
                    router.back();
                }} style={[styles.deleteButton, {backgroundColor: backgroundColor}]}>
                    <Text style={styles.deleteButtonText}>Delete task</Text>
                </TouchableOpacity>
            )}
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 12,
        flex: 1,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        justifyContent: 'center',
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginVertical: 8,
    },
    dateTimeButton: {
        flex: 1,
        minHeight: 44,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    statusBox: {
        minHeight: 44,
        minWidth: 95,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusLabel: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#333333',
        fontWeight: '600',
    },
    deleteButton: {
        minHeight: 66,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        display: 'flex',
        top: -10,
        color: 'red',
        fontSize: 18,
    }
});