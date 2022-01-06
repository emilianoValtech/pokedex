import axios from 'axios'

//constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    offset: 0,
}

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'
//reducer
export default function pokeReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return { ...state, ...action.payload }
        case SIGUIENTE_POKEMONES_EXITO:
            return { ...state, ...action.payload }
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state
    }
}

//actions
export const obtenerPokemonesAccion = () => async (dispatch) => {

    if (localStorage.getItem('offset=0')) {
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }


    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: response.data
        })
        localStorage.setItem('offset=0', JSON.stringify(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const { next } = getState().pokemones
    if (localStorage.getItem(next)) {
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }
    try {
        const response = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: response.data
        })
        localStorage.setItem(next, JSON.stringify(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {
    const { previous } = getState().pokemones

    if (localStorage.getItem(previous)) {
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }


    try {
        const response = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: response.data
        })
        localStorage.setItem(previous, JSON.stringify(response.data))

    } catch (error) {
        console.log(error)
    }
}

export const unPokeDetalleAccion = (url) => async (dispatch, getState) => {
    if(url === undefined){
        url = 'https://pokeapi.co/api/v2/pokemon/1/'
    }
    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const res = await axios.get(url)
        // console.log(res.data)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                foto: res.data.sprites.front_default,
                alto: res.data.height,
                ancho: res.data.weight
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            foto: res.data.sprites.front_default,
            alto: res.data.height,
            ancho: res.data.weight
        }))

    } catch (error) {
        console.log(error.response)
    }
}



