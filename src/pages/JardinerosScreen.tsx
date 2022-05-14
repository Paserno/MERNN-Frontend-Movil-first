import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, ScrollView} from 'react-native';
import { Card } from '../components/Card';
import { BackgroundChat } from '../components/BackgroundChat';
import Icon from 'react-native-vector-icons/Ionicons';
import { UsuarioContext } from '../context/UsuarioContext';
// import { Usuario } from '../interface/activoInterface';



export const JardinerosScreen = ({ navigation }: any) => {

  const {usuarios, cargarUsuario} = useContext(UsuarioContext);

  useEffect(() => {
    cargarUsuario();
  }, [])

  
  const renderItem = ({item}:any) => (
    <Card datos={ item } />
    
  )

  
  return (
    <BackgroundChat>
      <StatusBar  translucent barStyle="light-content" backgroundColor="transparent" />
    <View style={ styles.sectionText }>
      <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={ () => navigation.navigate('ProtectedScreen') }
      >
        <Icon 
            name={ 'arrow-back-sharp' }
            color="white"
            size={ 35 }
            style={{ marginLeft: -20}}
        /> 
      </TouchableOpacity>
      <Text style={ styles.title}>Jardineros</Text>
      <TouchableOpacity
        activeOpacity={ 0.8 }
      >
      <Icon 
          name={ 'search-sharp' }
          color="white"
          size={ 34 }
          style={{ marginRight: 20}}
      /> 
      </TouchableOpacity>
      
    </View>
    <View style={ styles.contanierBlanco}>
      {/* <ScrollView> */}
        <View style={ styles.contanier }>
            <FlatList 
              data={ usuarios }
              keyExtractor={ (item) => item._id }
              renderItem={ renderItem }
              // horizontal={ true }
              showsVerticalScrollIndicator={ false}
              style={{ width: 350, height: 75, marginBottom: 10}}
            />
            
            {/* <Card /> */}

        </View>
      {/* </ScrollView> */}
    </View>

    
    </BackgroundChat>
  )
}

const styles = StyleSheet.create({
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