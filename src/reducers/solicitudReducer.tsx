
type SolicitudAction = 
|  { type: 'NoExisteSolicitud' }
|  { type: 'ExisteSolicitud', payload: any }
|  { type: 'LoadingSolicitud'}


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
        
        
            
    
        default:
            return state;
    }

}