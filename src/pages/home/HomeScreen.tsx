import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useHomeScreen } from './useHomeScreen';
import { styles } from './HomeScreen.styles'
import { Stack } from 'expo-router';
import {getStatusLabel} from "../../features/taskStatus/lib/getStatusLabel";
import { useThemeColor } from '../../shared/lib/hooks/useThemeColor';
import {globalStyles} from "../../shared/styles/globalStyles";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../../shared/ui/Icon';


export default function HomeScreen() {
    const {
        tasks,
        sortedTasks,
        sortOptionsData,
        sortMode,
        showSortDropdown,
        setShowSortDropdown,
        setSortMode,
        backgroundColor,
        upBackgroundColor,
        textColor,
        iconColor,
        statusGradientColors,
        router,
    } = useHomeScreen();

    const sortOptions = sortOptionsData.map(({ label, value, direction }) => ({
        label,
        value,
        icon: <Icon name={direction === 'up' ? 'arrowUp' : 'arrowDown'} size={20} color={iconColor} />,
    }));

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
                            <Icon name="sort" size={20} color={iconColor} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => router.push('/task/task_view')}
                        >
                            <Icon name="add" size={20} color={iconColor} />
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
