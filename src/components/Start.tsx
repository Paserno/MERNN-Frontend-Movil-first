import React from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export const Start = () => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: -10}}>
        <Icon 
            name={ 'star' }
            color="black"
            size={ 20 }
            style={ {} }
        /> 
        <Icon 
            name={ 'star' }
            color="black"
            size={ 20 }
            style={ {} }
        /> 
        <Icon 
            name={ 'star' }
            color="black"
            size={ 20 }
            style={ {} }
        /> 
        <Icon 
            name={ 'star-half-sharp' }
            color="black"
            size={ 21.5 }
            style={ {} }
        /> 
        <Icon 
            name={ 'star-outline' }
            color="black"
            size={ 21 }
            style={ {} }
        /> 
    </View>
  )
}
