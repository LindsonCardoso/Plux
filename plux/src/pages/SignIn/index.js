import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import './signin.css'


import Logo from '../../assets/logo.jpg'

export default function SingnIn(){
    
    const [email, setEmail]  = useState('')
    const [password, setPassword] = useState('')
    
    function handleSubmit(e){
        e.preventDefault()
        alert('CLICOU')
    }

    return( 
        <div className="container-center"> 
         <div className="login">
          <div className="login-area">
            <img src={Logo} />
          </div>
        
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="text" placeholder="Nome" value={email} onChange={(e) => setEmail(e.target.value)}/>
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