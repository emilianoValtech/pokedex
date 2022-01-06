import Pokemones from "./Components/Pokemones";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import { auth } from "./firebase";




function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(()=>{
    console.log(process.env);
    const fetchUser = () => {
      auth.onAuthStateChanged(user =>{
        if(user){
          setFirebaseUser(user)
        }else {
          setFirebaseUser(null)
        }
      })
    }

    fetchUser()
  }, [])

  const RutaPrivada = ({component, path, ...rest}) => {
      if(localStorage.getItem('usuario')){
          const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
          if(usuarioStorage.uid === firebaseUser.uid){
            return <Route component={component} path={path} {...rest}/>
          } else{
           return <Redirect to='/login' {...rest}/>
          }
      }else{
        return <Redirect to='/login' {...rest}/>
      }
  }

  return firebaseUser !== false ? 
  (
    <Router>
        <div className="container mt-3">
          <Navbar />
          <Switch>
            <RutaPrivada component={Pokemones} path={'/'} exact/>
            <Route component={Login} path={'/login'} exact/>
          </Switch>
        </div>
    </Router>
  ) : (<div>Cargando...</div>)
}

export default App;
