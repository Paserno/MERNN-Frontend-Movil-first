import React, {useContext} from 'react'
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { soliStyles } from '../theme/soliTheme';
import { BackgroundChat } from '../components/BackgroundChat';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UsuarioContext } from '../context/UsuarioContext';
import { Start } from '../components/Start';
import { SolicitudContext } from '../context/SolicitudContext';
import { LoadingScreen } from './LoadingScreen';


export const ContenidoScreen = () => {
    const navigator = useNavigation();
    const {jardinero} = useContext(UsuarioContext);
    const {ok, isLoadingSoli, crearSolicitud} = useContext(SolicitudContext);
    const { usuario } = jardinero;
    

    const uri = 'https://www.mundojardineria.com/site/article/5287/6829/consejos-para-una-correcta-poda-de-los-arboles-0_ai1.jpg'

    if (isLoadingSoli){
        return (
        <LoadingScreen/>
        )

    }

    const pedirSolicitud = () => {
        crearSolicitud(jardinero._id);
        navigator.dispatch(
            CommonActions.navigate({
                name: 'TopTabNavigator'
            })
        )
    }
    

    return (
        <BackgroundChat>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <View style={soliStyles.sectionText}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigator.dispatch(CommonActions.goBack())}
                >
                    <Icon
                        name={'arrow-back-sharp'}
                        color="white"
                        size={35}
                        style={{ marginLeft: -20 }}
                    />
                </TouchableOpacity>
                <Text style={{...soliStyles.title, marginLeft: -10}}>Contacto</Text>
                <Text>       </Text>
            </View>
            <View style={soliStyles.contanierBlanco}>
                <View style={soliStyles.conteinerImg }>
                <View style={soliStyles.containerImgContenido}>
                    <Image
                        style={soliStyles.imgContenido}
                        source={{ uri }}
                    />
                </View>
                </View>

                <View style={{margin: 10}}>

                
                <Text style={soliStyles.labelContenido}>Nombre: {usuario?.nombre} {usuario?.apellido}</Text>
                <Text style={soliStyles.labelContenido}>Especialidad: {jardinero?.especialidad} </Text>
                <Text style={soliStyles.labelContenido}>Correo Contacto: {usuario?.correo} </Text>
                <Text style={soliStyles.labelContenido}>Descripción: {jardinero?.descripcion} </Text>
                
                <Text style={soliStyles.labelContenido}>Puntuación:  <Start/></Text>
                
                {
                    (ok)
                    ?(
                    <TouchableOpacity
                    activeOpacity={0.8}
                    style={soliStyles.btnContenido}
                    onPress={ () => navigator.dispatch(
                        CommonActions.navigate({
                            name: 'TopTabNavigator'
                        })
                    )}
                >
                    <Text style={soliStyles.btnContenidoText}>Continuar</Text>
                </TouchableOpacity> )
                    : (
                        <TouchableOpacity
                    activeOpacity={0.8}
                    style={soliStyles.btnContenido}
                    onPress={ pedirSolicitud }
                >
                    <Text style={soliStyles.btnContenidoText}>Solicitar</Text>
                </TouchableOpacity> )
                }
                

                
                </View>
            </View>
        </BackgroundChat>

    )
}
