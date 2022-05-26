
type SolicitudAction = 
|  { type: 'NoExisteSolicitud' }
|  { type: 'ExisteSolicitud', payload: any }
|  { type: 'CargarSolicitud', payload: any }
|  { type: 'LoadingSolicitud'}
|  { type: 'ActualizarSolicitud', payload: any}
|  { type: 'EliminarSolicitud'}
|  { type: 'CargarDetalleSolicitud', payload: any}
|  { type: 'CargaDetalleVacia'}


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

        case 'CargarSolicitud': 
            return {
                ...state,
                solicitud: action.payload,
                ok: true,
                isLoadingSoli: false
            }

        case 'CargarDetalleSolicitud':
            return {
                ...state,
                detalleSolicitud: action.payload
            }
        
        case 'CargaDetalleVacia':
            return {
                ...state,
                detalleSolicitud: []
            }
            
    
        default:
            return state;
    }

}