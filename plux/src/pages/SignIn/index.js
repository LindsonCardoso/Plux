import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { Input } from "@chakra-ui/react"
import { toast } from 'react-toastify';
import { 
  Container,
  Box, 
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,Center
} from '@chakra-ui/react'

import './signin.css'


import Logo from '../../assets/logo.jpg'

export default function SingnIn(){
    
    const [login, setLogin]  = useState('')
    const [senha, setSenha] = useState('')

    //API Login
    const { singIn, loadingAuth } = useContext(AuthContext)
  //API CADASTRO
    const Login = (e) => {

      e.preventDefault();
      if(login !== '' && senha !== '') {
        singIn(login, senha);
      }
    
    }


    return( 
 
        <Box className="container-center"> 
          <Box className="login">
          <div className="login-area">
            <img src={Logo} alt=""/>
          </div>
          <form onSubmit={Login}>
            <input type="text" placeholder="login"  onChange={ (e) => {setLogin(e.target.value)}}/>
            <input type="password"  placeholder="senha" onChange={(e) => {setSenha(e.target.value)}} />
            <button type="submit" className="btn">{loadingAuth ? 'Carregando...' : 'Entrar'}</button>
          </form>
          <Link to="/register">Criar conta</Link>
          <div className="register">
            <Link to="/registrar-ponto">Registrar ponto agora</Link>
          </div>
         </Box>
     
        </Box>

    )
}   