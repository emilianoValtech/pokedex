import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesionAccion } from '../Redux/usuarioDucks'
import { withRouter } from 'react-router-dom'


const Navbar = (props) => {

    const dispatch = useDispatch()
    const activo = useSelector(store => store.usuario.activo)


    const cerrar = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand ms-3">Pokedex</Link>
            <div>
                <div className="d-flex">
                    {
                        activo ? (
                            <>
                                <NavLink className="btn btn-dark me-2" to="/" exact>
                                    Inicio
                                </NavLink>
                                <NavLink className="btn btn-dark me-2" to="/perfil" exact>
                                    Perfil
                                </NavLink>
                                <button className="btn btn-dark" onClick={() => cerrar()}>
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <NavLink className="btn btn-dark me-3" to="/login" exact>
                                Login
                            </NavLink>
                        )
                    }




                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)