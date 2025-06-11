import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    Platform,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, } from 'expo-router';
import { styles } from './TaskView.styles';
import { useTaskView } from "./useTaskView";
import { getStatusLabel } from "../../features/taskStatus/lib/getStatusLabel";
import { deleteTask } from "../../features/deleteTask/deleteTask";
import { nextStatus } from "../../features/taskStatus/lib/nextStatus";
import { Task, TaskStatus } from "../../entities/task/taskModel";
import { useThemeColor } from '../../shared/lib/hooks/useThemeColor'; // hook which return color
import { globalStyles } from '../../shared/styles/globalStyles';  // global styles

export default function TaskView() {
    const {
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
    } = useTaskView();

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
