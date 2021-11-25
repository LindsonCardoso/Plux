import React, { useState, useContext } from 'react'
import Axios from 'axios'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { Input } from "@chakra-ui/react"
import { 
  Box, 
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  chakra,
  Button,
  Avatar,
  Heading,
  FormControl,
  FormLabel,
  IconButton,
  useColorModeValue,Center
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa";
import ThemeToggleButton from '../../components/theme-toggle-button'
import Logo from '../../assets/logo.jpg'


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);


export default function SingnIn(){
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

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
 
      <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
       align="center">
   
      <Box
        p={30}
        maxWidth="500px"
        borderWidth={2}
        borderRadius={8}
        boxShadow="md"
      >
        <Box flex={1} marginBottom={4} maxWidth="auto">
        <img src={Logo} alt="" style={{borderRadius:"10px"}}/>   
        </Box>

        <form onSubmit={Login}>
        <FormControl isRequired>
          <FormLabel>Login</FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="login"  onChange={ (e) => {setLogin(e.target.value)}}
          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="*******"
            size="lg"
            onChange={(e) => {setSenha(e.target.value)}}
          />
        </FormControl>
        <Button
          variantColor="teal"
          variant="outline"
          type="submit"
          width="full"
          mt={4}
        >
          {loadingAuth ? 'Carregando...' : 'Entrar'}
  </Button>
</form>
       
      <Box  mt={2} justifyContent="center" alignItems="center" textAlign="center">
        Nao tem conta?{" "}
        <Link  to="/register" color="green.600" >
         Criar conta
        </Link>
      </Box>
      </Box>
    </Flex>
      
    )
}   