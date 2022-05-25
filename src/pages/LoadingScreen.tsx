import React, { useContext } from 'react'
import { ActivityIndicator, View, Button, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { BackgroundChat } from '../components/BackgroundChat';

export const LoadingScreen = () => {

  const { logOut } = useContext( AuthContext );


  return (
    <BackgroundChat>
      <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />

    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <ActivityIndicator 
          size={ 50 }
          color='black'
        />
        <View style={{ position: 'absolute', bottom: 20}}>
          <Button 
            title='logout'
            color='#dc3545'
            onPress={ logOut }
          />
        </View>
    </View>
    </BackgroundChat>
  )
}
