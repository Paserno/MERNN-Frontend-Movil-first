import { StackActions } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SolicitudContext } from '../context/SolicitudContext';

export const SolicitudScreen = ({ navigation }: any) => {
  const popAction = StackActions.pop(1);
  const { solicitud } = useContext(SolicitudContext)

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled( !isEnabled );


  return (
    <View style={ styles.conteiner }>
      <View style={ styles.subConteiner }>
        <Text style={ styles.title }>SolicitudScreen</Text>

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
          onPress={() => navigation.dispatch(popAction)}
          style={styles.blackButton}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={() => console.log('eliminar')}
          style={{...styles.redButton, marginTop: 25}}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>

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
});
