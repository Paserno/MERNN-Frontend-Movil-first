import { StackActions } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { SolicitudContext } from '../context/SolicitudContext';
import { SocketContext } from '../context/SocketContext';
import Icon from 'react-native-vector-icons/Ionicons';


export const SolicitudScreen = ({ navigation }: any) => {
  const popAction = StackActions.pop(1);
  const { solicitud } = useContext(SolicitudContext);
  const {socket} = useContext(SocketContext);

  const [isEnabled, setIsEnabled] = useState(solicitud.confirmacion);
  const toggleSwitch = () =>{ 
    setIsEnabled( !isEnabled )
  };

  const guardarCambios = () => {
    
    socket.emit( 'cambio-solicitud',{
             id: solicitud._id,
             confirmacion: isEnabled,
             
        })
  }

  const alertaEliminar = () => {
    Alert.alert('Eliminar Solicitud', '¿Quieres eliminar esta solicitud?',[
      {
        text: 'Cancelar',
        onPress: () => null
  
      },
      {
      text: 'Aceptar',
      onPress: eliminarSolicitudActiva,
    },
    
]);

  }

  const eliminarSolicitudActiva = () => {
    socket.emit( 'eliminar-solicitud',{
      id: solicitud._id,      
    });

    navigation.dispatch(popAction);
  }


  return (
    <View style={ styles.conteiner }>
      <View style={ styles.subConteiner }>
        <Text style={ styles.title }>SolicitudScreen</Text>

        <Text>
          { JSON.stringify(isEnabled, null, 5) }
        </Text>

        <Text style={{margin: 20}}>Confirmación: 

        <Switch
        trackColor={{ false: "#979699", true: "#84B374" }}
        thumbColor={isEnabled ? "#D9D6DE" : "#D9D6DE"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </Text>

        <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={guardarCambios}
          style={styles.blackButton}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={() => navigation.dispatch(popAction)}
          style={{...styles.blackButton, marginTop: 10}}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={eliminarSolicitudActiva}
          style={{...styles.redButton, marginTop: 25}}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity> */}

        {/* <Fab iconName='trash'
          onPress={  }
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20
          }}/> */}
        <View style={{
          position: 'absolute',
          bottom: 20,
          right: 20
        }}>
          <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ alertaEliminar }
              style={styles.FAButton}
          >
              <Icon 
                  name={ 'trash' }
                  color="white"
                  size={ 32 }
                  style={{ }}
              /> 
          </TouchableOpacity>

        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  subConteiner: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: 25,
  },
  blackButton: {
    height: 45,
    width: 200,
    backgroundColor: '#1c1c1c',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    elevation: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  redButton: {
    height: 45,
    width: 200,
    backgroundColor: '#c9302c',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    elevation: 6
  },
  FAButton: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: '#c9302c',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
}
});
