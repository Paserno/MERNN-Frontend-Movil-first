import { Usuario, Jardinero } from '../interface/activoInterface';



type UsuarioAction =
    | { type: 'cargarUsuarios', payload: { usuarios: Usuario[] } }
    | { type: 'obtenerJardinero', payload: { jardinero: Jardinero } }
    | { type: 'uiCloseModal' }
    | { type: 'uiOpenModal' }
    | { type: 'sinFiltro' }
    | { type: 'filtrarUsuarios', payload: any }



export const usuarioReducer = (state: any, action: UsuarioAction) => {

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

        case 'uiCloseModal':
            return {
                ...state,
                isOpenModal: false,
            }

        case 'uiOpenModal':
            return {
                ...state,
                isOpenModal: true,
            }

        case 'filtrarUsuarios':
            // console.log(state.usuarios)
            return {
                ...state,
                isSearching: true,
                busqueda: state.usuarios.filter((usuario: any) => (
                    usuario.nombre.toLowerCase().includes(action.payload) ||
                    usuario.apellido.toLowerCase().includes(action.payload) ||
                    usuario.jardinero.especialidad.toLowerCase().includes(action.payload)
                ))
            }

        case 'sinFiltro':
            return {
                ...state,
                isSearching: false,

            }



        default:
            return state;
    }


}