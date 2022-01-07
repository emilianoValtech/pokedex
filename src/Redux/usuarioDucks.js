import {firebase, auth, db, storage} from '../firebase'

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

        const usuario = {
            uid: response.user.uid,
            email: response.user.email,
            displayName: response.user.displayName,
            photoURL: response.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
        if(usuarioDB.exists){
            // cuando existe el usuario
            console.log(usuarioDB)
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            //no existe el usuario
            await db.collection('usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario 
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }
        
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

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {user} = getState().usuario
    console.log(user)

    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        })
        const usuarioEditado = {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))
    } catch (error) {
        console.log(error)
    }
}

export const actualizarFotoAccion = (imagen) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuario

    try {

        const refImagen = storage.ref().child(user.email).child('foto perfil')
        await refImagen.put(imagen)
        const urlDescarga = await refImagen.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: urlDescarga
        })

        const usuarioEditado = {
            ...user,
            photoURL: urlDescarga
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuarioEditado
        })
        localStorage.setItem('usuario', JSON.stringify(usuarioEditado))

        
    } catch (error) {
        console.log(error)
    }

}