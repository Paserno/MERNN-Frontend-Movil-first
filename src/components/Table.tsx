import React, {useContext} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SolicitudContext } from '../context/SolicitudContext';
import { ItemTable } from './ItemTable';
//  { JSON.stringify(isEnabled, null, 5) }

export const Table = () => {

  const {detalleSolicitud} = useContext(SolicitudContext);

  const renderItem = ({item}:any) => (
    <ItemTable item={item}/>
  )

  return (
    <View style={{ height: 150}}>
      <View style={{...styles.tableDetalle}}>
      <View style={{ width: 110 }}>
        <Text>Servicio</Text>
      </View>
      <View style={{ width: 100, marginLeft: 10}}>
        <Text>Precio</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10}}>
        <Text>Estado</Text>
      </View>
      <View style={{ width: 80, marginLeft: 10}}>
        <Text>Eliminar</Text>
      </View>
    </View>
        <FlatList 
          data={ detalleSolicitud }
          renderItem={renderItem}
          keyExtractor={(item,index)=> index.toString()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    tableDetalle: {
      flexDirection: 'row',
      borderBottomColor: 'rgba(160,160,160,0.8)',
      borderBottomWidth: 2,
      marginLeft: 10,
      marginRight: 10,
    }
});