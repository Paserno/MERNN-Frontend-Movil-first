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
    btnContenido: {
      marginTop: 20,
      flexDirection:'row',
      backgroundColor: '#37BD30',
      height: 40,
      minWidth: 120,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    
    },
    btnContenidoText: {
        fontSize: 18,
        color: 'white'
    
    },
    labelContenido:{
        marginTop: 10,
        color: 'black',
        fontWeight: 'normal',
        fontSize: 16,

      },
    conteinerImg: {
        borderBottomLeftRadius: 75,
        // borderBottomRightRadius: 50,
        width: '100%',
        height: 550 * 0.7,
        shadowColor: "#000",
        borderRadius: 18,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
    
        elevation: 10,
    },
    containerImgContenido:{
        flex: 1,
        overflow: 'hidden',
        borderBottomLeftRadius: 75,
        // borderBottomRightRadius: 50,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,

        // backgroundColor: 'red

    },
    imgContenido: {
        flex: 1
        
    }
});