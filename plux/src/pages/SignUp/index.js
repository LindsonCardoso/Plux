
import { useState,useContext } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { Input } from "@chakra-ui/react";
import { 
  Box, 
  Flex,
  Button,
  FormControl,
  FormLabel,Heading
} from '@chakra-ui/react'

import Logo from '../../assets/logo.jpg';

function SignUp() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);
  let history = useHistory();
  //API CADASTRO
  const Cadastro = (e) => {
    e.preventDefault();
    if(nome !== '' && login !== '' && email !== '' && senha !== '') {
      signUp(nome, login, email, senha)
    }  


    setTimeout(() => {history.push("/")},3100);
  

  }



  
  return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    justifyContent="center"
    alignItems="center"
     align="center">
 
    <Box
      p={30}
      borderWidth={2}
      borderRadius={8}
      boxShadow="md"
      width="30%"
  >
      <Box flex={1} marginBottom={4} textAlign="center">
      <Heading as="h3" size="lg" >Olá, informe os dados abaixo! 😊</Heading>
       </Box>

      <form onSubmit={Cadastro}>

   
      <FormControl isRequired mt={6}>
        <FormLabel>Nome Completo</FormLabel>
        <Input
           placeholder="Nome Completo" 
           value={nome} 
          onChange={ (e) => {setNome(e.target.value)}}
          size="lg"

        />
      </FormControl>

      <FormControl isRequired mt={6}>
        <FormLabel>Login</FormLabel>
        <Input
           placeholder="login" 
           value={login} 
          onChange={ (e) => {setLogin(e.target.value)}}
          size="lg"

        />
      </FormControl>

      <FormControl isRequired  mt={6}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          size="lg"
          placeholder="Email" 
          value={email}
          onChange={ (e) => {setEmail(e.target.value)}}
        />
      </FormControl>
      <FormControl isRequired mt={6}>
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          placeholder="*******"
          size="lg"
          value={senha}
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
       {loadingAuth ? 'Carregando...' : 'Cadastrar'}
</Button>
</form>
     
    <Box  mt={2} justifyContent="center" alignItems="center" textAlign="center">
    Já tem uma conta?{" "}
      <Link to="/" color="green.600" >
      Logar
      </Link>
    </Box>
    </Box>
  </Flex>
  );
}

export default SignUp;
