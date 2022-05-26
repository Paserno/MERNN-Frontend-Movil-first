import React,{ createContext, useReducer } from "react";
import { solicitudReducer } from '../reducers/solicitudReducer';
import connectionApi from '../api/ConnectionApi';

export const SolicitudContext = createContext({} as any);


const initialState = {
    isLoadingSoli: true,
    solicitud: {},   // La solicitud activa
    detalleSolicitud: [], // El arreglo de detalle solicitud.
    ok: true,
}

export const SolicitudProvider = ({ children }: any ) => {

    const [stateSolicitud, disparo] = useReducer( solicitudReducer, initialState);

    const obtenerSolicitud = async(id: string) => {
        try {
            const {data} = await connectionApi.get(`/usuarios/soli/${id}`, {});

            if (!data.ok){
                return disparo({
                    type: 'NoExisteSolicitud'
                })
            }
                disparo({
                    type: 'ExisteSolicitud',
                    payload: data.solicitud
                })
        

        } catch (error:any) {
            console.log(error.response.data)
            console.log(error.response.data.errors[0])
        }

    }

    const crearSolicitud = async(idJardinero: string) => {
        try {
            const {data} = await connectionApi.post(`/soli`, {idJardinero});
            
            if (data.ok){
                const solicitud = data.solicitud

                disparo({
                    type: 'CargarSolicitud',
                    payload: solicitud
                })
            }
            
        } catch (error: any) {
            console.log(error.response.data)
            
        }


    }

    const loadingSolicitud = () => {
        disparo({
            type: 'LoadingSolicitud'
        })
    }

    const actualizarSolicitud = (solicitud: any) => {
        disparo({
            type: 'ActualizarSolicitud',
            payload: solicitud
        })
    }

    const eliminarSolicitud = () => {
        disparo({
            type: 'EliminarSolicitud'
        })
    }

    const obtenerDetalleSolicitud = async(idSolicitud: any) => {
        try {
            const {data} = await connectionApi.get(`/soli/detalle/${idSolicitud}`, {});
            console.log(data);

            if (!data.msg){
                return disparo({
                    type: 'CargarDetalleSolicitud',
                    payload: data.detalleSolicitud
                })
            }
            disparo({
                type: 'CargaDetalleVacia',
            })
            
        } catch (error: any) {
            console.log(error.response.data)
            console.log(error.response.data.errors[0])
        }
    }

    return (
        <SolicitudContext.Provider value={{
            ...stateSolicitud,
            obtenerSolicitud,
            crearSolicitud,
            loadingSolicitud,
            actualizarSolicitud,
            eliminarSolicitud,
            obtenerDetalleSolicitud,
        }}>
            { children }
        </SolicitudContext.Provider>
    )

}