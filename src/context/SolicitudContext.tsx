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

    const loadingSolicitud = () => {
        disparo({
            type: 'LoadingSolicitud'
        })
    }

    return (
        <SolicitudContext.Provider value={{
            ...stateSolicitud,
            obtenerSolicitud,
            loadingSolicitud,
        }}>
            { children }
        </SolicitudContext.Provider>
    )

}