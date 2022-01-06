import {firebase, auth} from '../firebase'

//constantes
const dataInicial = {
    loading: false,
    activo: false,

}
// types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'
//reducers
export default function usuarioReducer(state = dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading:true}
        case USUARIO_ERROR:
            return  {...dataInicial}   
        case USUARIO_EXITO:
            return {...state, loading:false, user:action.payload, activo:true}    
        case CERRAR_SESION:
            return  {...dataInicial}
        default:
            return {...state};
    }
}
//actions
export const ingresoUsuarioAccion = () => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    try {   

        const provider = new firebase.auth.GoogleAuthProvider();
        const response = await auth.signInWithPopup(provider)

        dispatch({
            type: USUARIO_EXITO,
            payload: {
                user: {
                    uid: response.user.uid,
                    email: response.user.email
                }
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: response.user.uid,
            email: response.user.email
        }))

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR,
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()

    localStorage.removeItem('usuario')

    dispatch({
        type:CERRAR_SESION,
    })
}