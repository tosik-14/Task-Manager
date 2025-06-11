import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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