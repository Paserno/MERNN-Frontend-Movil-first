import React, {useContext} from 'react'
import { View, Text, FlatList } from 'react-native';
import { SolicitudContext } from '../context/SolicitudContext';
//  { JSON.stringify(isEnabled, null, 5) }

export const Table = () => {

  const {detalleSolicitud} = useContext(SolicitudContext)

  // TODO: Crear Componente para mostrar tabla personalizada con estilos
  const renderItem = ({item}:any) => (
    <View style={{flexDirection: 'row'}}>
      <View style={{ width: 100, marginLeft: 10}}>
        <Text>{item.precio}</Text>
      </View>
      <View style={{ width: 120 }}>
        <Text>{item.idTipoServicio.nombre}</Text>
      </View>
      <View style={{ width: 100, marginLeft: 10}}>
        <Text>{JSON.stringify(item.realizado, null, 5)}</Text>
      </View>
    </View>

    
  )

  return (
    <View style={{}}>
      <View style={{flexDirection: 'row'}}>
      <View style={{ width: 100, marginLeft: 10}}>
        <Text>Precio</Text>
      </View>
      <View style={{ width: 120 }}>
        <Text>Servicio</Text>
      </View>
      <View style={{ width: 100, marginLeft: 10}}>
        <Text>Estado</Text>
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
