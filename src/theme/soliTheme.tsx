import { StyleSheet } from 'react-native';


export const soliStyles = StyleSheet.create({
    contanierBlanco: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 10,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25
    },
    contanier: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    sectionText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginTop: 30,
        paddingLeft: 0,
        marginLeft: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.85)'
    },
});