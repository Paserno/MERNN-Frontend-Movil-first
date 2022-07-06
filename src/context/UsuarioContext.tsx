import React, { createContext, useReducer, useContext } from 'react'
import { usuarioReducer } from '../reducers/usuarioReducer';
import connectionApi from '../api/ConnectionApi';
import { SolicitudContext } from './SolicitudContext';


const initialState = {
    isLoading: true,
    usuarios: [],   // Todos los usuartios de la base de dato
    jardineros: [],
    jardinero: {},  // Jardinero Seleccionado con sus datos.
    usuario: {},   // Un Registro de la BD
    isOpenModal: false, // Modal
    busqueda: [], // El filtro de Usuarios buscados
    isSearching: false,
}

export const UsuarioContext = createContext({} as any);

export const UsuarioProvider = ({ children }: any ) => {

    const [state, dispatch] = useReducer(usuarioReducer, initialState);
    const { obtenerSolicitud, loadingSolicitud }= useContext(SolicitudContext);

    const cargarUsuario = async() => {
        try {
        const {data} = await connectionApi.get('/jardin', {});

        if (data.ok){
            const usuarios = data.usuarios
            dispatch({
                type: 'cargarUsuarios',
                payload: usuarios
                
            })
        }
            
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerJerdinero = async(id: string) => {
        loadingSolicitud();
        
        try {
        const {data} = await connectionApi.get(`/admin/jardin/${id}`, {});

        if (data.ok){
            const { jardinero } = data;
            obtenerSolicitud(jardinero._id);

            dispatch({
                type: 'obtenerJardinero',
                payload: jardinero
            })
        }
            
        } catch (error) {
            console.log(error);
        }
    }

    const buscarJardineros = (buscar: string) => {

        const search = buscar.toLowerCase()

        dispatch({
            type: 'filtrarUsuarios',
            payload: search
        })
    }

    const eliminarBusqueda = () => {
        dispatch({
            type: 'sinFiltro'
        })
    }

    const cerrarModalSolicitud = () => {
        dispatch({type: 'uiCloseModal'});
    }

    const abrirModalSolicitud = () => {
        dispatch({type: 'uiOpenModal'});
    }

    return (
        <UsuarioContext.Provider value={{
            ...state,
            cargarUsuario,
            obtenerJerdinero,
            cerrarModalSolicitud,
            abrirModalSolicitud,
            buscarJardineros,
            eliminarBusqueda,
        }}>
            { children }
        </UsuarioContext.Provider>
    )
}


