import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    dateTouch: {
        width: 142,
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    datePickerMask: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 140,
        overflow: 'hidden',
    },
    toolbar: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    btnText: {
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tooltitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    btnTextText: {
        fontSize: 16,
        color: '#46cf98',
    },
    btnTextCancel: {
        color: '#666',
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});

export default style;
