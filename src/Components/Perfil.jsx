import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actualizarUsuarioAccion, actualizarFotoAccion } from '../Redux/usuarioDucks'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = () => {
        if (!nombreUsuario.trim()) {
            console.log('nombre vacio')
            return
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }

    const seleccionarArchivo = (e) => {
        console.log(e.target.files[0])
        const imagen = e.target.files[0]

        if (imagen === undefined) {
            console.log('sin imagen')
            return
        }

        if (imagen.type === 'image/jpeg' || imagen.type === 'image/png') {
            dispatch(actualizarFotoAccion(imagen))
            setError(false)
        } else {
            console.log('archivo no válido')
            setError(true)
            return
        }
    }

    return (
        <div className='mt-5 text-center'>
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" width="150px" className="img-fluid" />
                    <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                    <p className="card-text">Email: {usuario.email}</p>
                    <button className='btn btn-dark mb-3' onClick={() => setActivarFormulario(true)}>Editar nombre</button>

                    {
                        error &&
                        <div className="alert alert-warning">Solo archivos .png o .jpg</div>
                    }


                    <div className="input-group mb-3 justify-content-center">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="validatedCustomFile"
                            onChange={e => seleccionarArchivo(e)}
                            required
                            disabled={loading}
                            style={{ display: 'none' }}
                        />
                        <label
                            className={loading ? "btn btn-dark disabled" : "btn btn-dark"}
                            htmlFor="validatedCustomFile"
                        >
                            Editar foto perfil
                        </label>

                    </div>
                </div>
                {
                    loading && (

                        <div className="text-center">
                            <div className="spinner-border" role="status">
                            </div>
                        </div>

                    )
                }
                {
                    activarFormulario && (
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Nuevo nombre'
                                        required
                                        value={nombreUsuario}
                                        onChange={(e) => { setNombreUsuario(e.target.value) }}
                                    />
                                    <button className='btn btn-dark mt-2' onClick={() => actualizarUsuario()}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Perfil
