import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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