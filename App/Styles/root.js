import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    navContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    navBar: {
        backgroundColor: '#ffc700',
        height: 64,
    },
    navBarTitle: {
        height: 64,
        paddingTop: 12,
    },
    navBarTitleText: {
        color: '#1a1a1a',
        fontSize: 16,
    },
    navBarLeftButton: {
        width:64,
        height: 64,
        padding: 8,
    },
    navBarRightButton: {
        width:64,
        height: 64,
        padding: 12,
    },
    scene: {
        flex: 1,
        paddingTop: 64,
    }
});
