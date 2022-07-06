import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, Modal, RefreshControl, TextInput, Pressable } from 'react-native';
import { Card } from '../components/Card';
import { BackgroundChat } from '../components/BackgroundChat';
import Icon from 'react-native-vector-icons/Ionicons';
import { UsuarioContext } from '../context/UsuarioContext';
// import { Usuario } from '../interface/activoInterface';
import { AuthContext } from '../context/AuthContext';



export const JardinerosScreen = ({ navigation }: any) => {

  const { usuarios, cargarUsuario, isOpenModal, cerrarModalSolicitud, isSearching, busqueda, eliminarBusqueda, buscarJardineros } = useContext(UsuarioContext);
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({
    busqueda: ''
  });



  useEffect(() => {
    cargarUsuario();
  }, [])

  const onRefresh = () => {
    setRefreshing(true);

    cargarUsuario();
    setRefreshing(false);
  }

  const onChange = (value: any, field: any) => {
    setForm({
      ...form,
      [field]: value
    });
  }

  const aplicarFiltro = () => {
    buscarJardineros(form.busqueda)
  }

  const eliminarFiltro = () => {
    eliminarBusqueda()
  }

  const todoOk = () => {
    return (form.busqueda.length > 1 ) ? true : false;

  }


  const renderItem = ({ item }: any) => (
    (item._id === user?.uid)
      ? null
      : <Card datos={item} />

  )



  return (
    <BackgroundChat>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.sectionText}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProtectedScreen')}
        >
          <Icon
            name={'arrow-back-sharp'}
            color="white"
            size={35}
            style={{ marginLeft: -20 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Jardineros</Text>

        {
          (isSearching)
            ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={eliminarFiltro}

              >
                <Icon
                  name={'close-outline'}
                  color="white"
                  size={34}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsVisible(true)}

              >
                <Icon
                  name={'search-sharp'}
                  color="white"
                  size={34}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>

            )

        }

        <Modal
          animationType='fade'
          visible={isVisible}
          transparent={true}
        >
          <View style={styles.containerModal}>

            <View style={styles.modalScreen}>

              <View style={styles.sectionTitle}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: 'black'
                }}> Buscar Jardinero </Text>
              </View>
              <View style={{ ...styles.form, bottom: 25 }}>
                <TextInput
                  placeholder='Ingresar busqueda'
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  style={styles.inputField}
                  selectionColor="black"
                  onChangeText={(value) => onChange(value, 'busqueda')}
                  value={form.busqueda}
                  autoCapitalize='none'
                  autoCorrect={false}
                  
                // keyboardType='number-pad'
                />
              </View>
              <View style={styles.sectionBtn}>

                <Pressable
                  onPress={() => {setIsVisible(false), aplicarFiltro()}}
                  disabled={!todoOk()}
                  style={ (!todoOk()) ?{...styles.blackButton, marginBottom: 10, alignSelf: 'center', backgroundColor: '#696969'} : {...styles.blackButton, marginBottom: 10, alignSelf: 'center'}  }
                >
                  <Text style={styles.buttonText}>Buscar</Text>
                </Pressable>

                <Pressable
                  onPress={() => { setIsVisible(false), cerrarModalSolicitud(), setForm({busqueda: ''}) }}

                  style={{ marginBottom: 15 }}
                >
                  <Text style={{ ...styles.buttonTextModal, alignSelf: 'center' }}>Cancelar</Text>
                </Pressable>

              </View>


            </View>

          </View>
        </Modal>
        {/* //////// */}
      </View>
      <View style={styles.contanierBlanco}>

        <View style={styles.contanier}>

          {
            (isSearching)
              ? (
                <>
                  <FlatList
                    data={busqueda}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    // horizontal={ true }
                    showsVerticalScrollIndicator={false}
                    style={{ width: 350, height: 75, marginBottom: 10 }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        progressViewOffset={50}
                      />
                    }
                  />

                </>
              )
              : (
                <FlatList
                  data={usuarios}
                  keyExtractor={(item) => item._id}
                  renderItem={renderItem}
                  // horizontal={ true }
                  showsVerticalScrollIndicator={false}
                  style={{ width: 350, height: 75, marginBottom: 10 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      progressViewOffset={50}
                    />
                  }
                />
              )
          }



          {/* <Card /> */}

          {/* </ScrollView> */}
        </View>
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
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalScreen: {
    width: 350,
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 10
  },
  sectionTitle: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    height: 65,
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
  sectionBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor:'red'
  },
  buttonTextModal: {
    color: '#5856D6',
    fontSize: 18,
    // fontWeight: '400'

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
  inputField: {
    color: 'black',
    fontSize: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 10
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
  },

});