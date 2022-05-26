
type SolicitudAction = 
|  { type: 'NoExisteSolicitud' }
|  { type: 'ExisteSolicitud', payload: any }
|  { type: 'LoadingSolicitud'}
|  { type: 'ActualizarSolicitud', payload: any}
|  { type: 'EliminarSolicitud'}


export const solicitudReducer = (state: any, action: SolicitudAction) => {

    switch (action.type) {

        case 'NoExisteSolicitud':
            return {
                ...state,
                ok: false,
                isLoadingSoli: false
            }

        case 'ExisteSolicitud':
            return {
                ...state,
                solicitud: action.payload,
                ok: true,
                isLoadingSoli: false
            }
        
        case 'LoadingSolicitud':
            return {
                ...state,
                isLoadingSoli: true
            }
        
        case 'ActualizarSolicitud':
            return {
                ...state,
                solicitud: action.payload
            }
        
        case 'EliminarSolicitud':
            return {
                ...state,
                solicitud: {},
                detalleSolicitud: [],
                ok: false,
            }
            
    
        default:
            return state;
    }

}