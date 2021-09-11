import React, { useState} from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import './signin.css'


import Logo from '../../assets/logo.jpg'

export default function SingnIn(){
    
    const [username, setUsername]  = useState('')
    const [password, setPassword] = useState('')
    
    const [loginStatus, setLoginStatus]  = useState('')
    
    Axios.defaults.withCredentials = true;
    
    function handleSubmit(e){
        e.preventDefault()
        alert('CLICOU')
    }

    const login = () => {
      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then(response => {
        if(!response.data.message){
          setLoginStatus(response.data.message)
        } else {
          console.log(response.data);
          setLoginStatus(response.data[0].username);
        }
      })
    }

    return( 
        <div className="container-center"> 
         <div className="login">
          <div className="login-area">
            <img src={Logo} />
          </div>
        
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password"  placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn">Acessar</button>
          </form>
          <Link to="/register">Criar conta</Link>
          <div className="register">
            <Link to="/registrarponto">Registrar ponto agora</Link>
          </div>
         </div>
        </div>
    )
}   