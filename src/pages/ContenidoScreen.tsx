import React from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { soliStyles } from '../theme/soliTheme';
import { BackgroundChat } from '../components/BackgroundChat';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


export const ContenidoScreen = () => {
    const navigator = useNavigation();

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
                <Text style={soliStyles.title}>Contenido</Text>
                <Text>       </Text>
            </View>
            <View style={soliStyles.contanierBlanco}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ alignSelf:'center', borderWidth: 2, padding: 3}}
                >
                    <Text style={soliStyles.title}>Hola</Text>
                </TouchableOpacity>

            </View>
        </BackgroundChat>

    )
}
