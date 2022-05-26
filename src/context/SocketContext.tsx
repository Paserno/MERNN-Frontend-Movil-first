import React, { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import { AuthState } from './authReducer';
import { ChatContext } from './ChatContext';
import { SolicitudContext } from './SolicitudContext';


export const SocketContext = createContext({} as any);

export const SocketProvider = ({children}:any) => {

    const { dispatch }= useContext(ChatContext);
    const { socket, conectarSocket, desconectarSocket } = useSocket('http://192.168.1.84:8082');
    const { logged }: AuthState = useContext(AuthContext);
    const { actualizarSolicitud, eliminarSolicitud } = useContext(SolicitudContext);

    useEffect(() => {
        if(logged){
          conectarSocket();
        }
    }, [ logged, conectarSocket])

    useEffect(() => {
      if (!logged){
        desconectarSocket()
      }
    }, [socket, desconectarSocket])
    
    
    useEffect(() => {

        socket?.on('mensaje-personal', (mensaje:any) => {
            dispatch({
                type: 'nuevoMensaje',
                payload: mensaje
            })
        });

    }, [socket, dispatch])

    useEffect(() => {

        socket?.on('cambio-solicitud', (solicitud:any) => {
            actualizarSolicitud(solicitud);
        });

    }, [socket])

    useEffect(() => {

        socket?.on('eliminar-solicitud', (solicitud:any) => {
            console.log(solicitud)
            eliminarSolicitud();
        });

    }, [socket])

    const desconectarSocketChat = () => {
        desconectarSocket();

    }

    return (
        <SocketContext.Provider value={{
            socket,
            desconectarSocketChat
        }}>
            { children}
        </SocketContext.Provider>
    )
}