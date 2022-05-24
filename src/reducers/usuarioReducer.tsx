import { Usuario, Jardinero } from '../interface/activoInterface';



type UsuarioAction = 
|  { type: 'cargarUsuarios', payload: { usuarios: Usuario[] } }
|  { type: 'obtenerJardinero', payload: { jardinero: Jardinero } }

export const usuarioReducer = ( state:any, action: UsuarioAction ) => {

    switch (action.type) {
        case 'cargarUsuarios':
            return {
                ...state,
                usuarios: action.payload
            };

        case 'obtenerJardinero':
            return {
                ...state,
                jardinero: action.payload
            }
    
        default:
            return state;
    }


}