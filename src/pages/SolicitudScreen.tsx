import { StackActions } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { SolicitudContext } from '../context/SolicitudContext';
import { SocketContext } from '../context/SocketContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Table } from '../components/Table';

//TODO: Validar un poco mas el switch Finalizar Servicio!
export const SolicitudScreen = ({ navigation }: any) => {
  const popAction = StackActions.pop(1);
  const { solicitud, obtenerDetalleSolicitud, detalleSolicitud } = useContext(SolicitudContext);
  const {socket} = useContext(SocketContext);

  const [isEnabled, setIsEnabled] = useState(solicitud.confirmacion);
  const [isSecundEnabled, setIsSecundEnabled] = useState(solicitud.start);
  const [isThirdEnabled, setIsThirdEnabled] = useState(solicitud.finish);

  const toggleSwitch = () =>{ 
    setIsEnabled( !isEnabled )
  };
  const toggleSecundSwitch = () => {
    setIsSecundEnabled(!isSecundEnabled)
  };
  const toggleThirdSwitch = () => {
    (!isThirdEnabled)
    ?(
      Alert.alert('Finalizar Solicitud', '¿Seguro que quiere Terminar la Solicitud?',[
        {
          text: 'Cancelar',
          onPress: () => null
        },
        {
          text: 'Aceptar',
          onPress: () => setIsThirdEnabled(true)
        }
      ])
        )
    : null
  };

  useEffect(() => {
    setIsSecundEnabled(solicitud.start)
    setIsThirdEnabled(solicitud.finish)
  }, [solicitud])

  useEffect(() => {
    const idSolicitud = solicitud._id;
    obtenerDetalleSolicitud(idSolicitud);
  }, [])
  

  const guardarCambios = () => {
    socket.emit( 'cambio-solicitud',{
             id: solicitud._id,
             confirmacion: isEnabled,
             finish: isThirdEnabled
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

  const mapSuma = () => {
    if (detalleSolicitud.length === 0 ){
      return null;
    }
    const sumaaReducer = (acumulador : number, numero: number) => acumulador + numero;
    const sumaPrecio = detalleSolicitud.map((e: {precio:string}) => parseInt(e.precio)).reduce(sumaaReducer)
    return sumaPrecio;
  }

  const habilitarSwitchFinalizar = () => {
    const numeroDetalle = detalleSolicitud.filter(
        (e: {realizado:boolean}) => (!e.realizado) 
          ? true
          : false 
    )
    if (numeroDetalle.length === 0 ){
      return true
    }
    return false
  }
  


  return (
    <View style={ styles.conteiner }>
      <View style={ styles.subConteiner }>
        <Text style={ styles.title }>Solicitud</Text>

     
        <Text style={{ margin: 15 }}>Confirmación:

          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isEnabled ? "#5856D6" : "#5856D6"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            // disabled
          />
          </Text>
          <Text style={{ margin: 15 }}>Iniciar Servicio:
          <Text style={{margin: 5}}>
            {JSON.stringify(solicitud.start, null, 5)}
          </Text>
          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isSecundEnabled ? "#D9D6DE" : "#D9D6DE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSecundSwitch}
            value={isSecundEnabled}
            disabled
          
          />
        </Text>

        <Text style={{ margin: 15 }}>Finalizar Servicio:
          <Text style={{margin: 5}}>
            {JSON.stringify(solicitud.finish, null, 5)}
          </Text>
          <Switch
            trackColor={{ false: "#979699", true: "#84B374" }}
            thumbColor={isThirdEnabled ? "#5856D6" : "#5856D6"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleThirdSwitch}
            value={isThirdEnabled}
            disabled={!habilitarSwitchFinalizar()}
          />
        </Text>


        <View style={styles.containerTable}>
          <Table />
        </View>
        
        <Text style={styles.textoTotal}> Total: { mapSuma() }</Text>


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
          {
            (solicitud.start)
              ? null
              : (
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

              )
          }

       
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
},
containerTable: {
  height: 230,
  marginTop: 30,
  width: '100%', 
  justifyContent: 'center', 
  alignItems: 'center',
  
},
textoTotal: { 
  marginTop: -10,
  alignSelf: 'flex-start', 
  marginLeft: 10,
  fontWeight: 'bold',

},
});
