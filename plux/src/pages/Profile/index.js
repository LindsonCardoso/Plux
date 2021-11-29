
import React, { useState, useContext } from 'react'
import { Header } from '../../components/Header';
import Title from '../../components/Title';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { FiSettings } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  InputRightElement,
  Box,
  InputGroup,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
  

export default function Profile(){

  const { user, signOut, setUser, storegeUser, cadEmpresa, loadingAuth } = useContext(AuthContext);
  const [guardaDados, setGuardaDados] = useState([])
  const [customer, setCustomerData] = useState({
    nome: "",
    login: "",
    senha: "",
    email: "",
    telefone: "",
    cpf: "",
    confirmPassword: ""
  });


  const [showSenha, setShowSenha] = useState(false)
  const [mostrar, setMostrar] = useState(false);
  //const [nome, setNome] = useState(user && user.nome);
    // error fields to display on form
    const [nomeError, setNomeError] = useState("");
    const [senhaError, setSenhaError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telefoneError, setTelefoneError] = useState("");
    const [cpfError, setCpfError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    
    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    });

  const toast = useToast()

//Handle all other controlled fields 
const handleChange = (e) => {
  const { name, value } = e.target;
  setCustomerData(prev => ({
       ...prev,
        [name]: value 
  }));
}


const handleEmailChange = (e) => {
  setCustomerData(prev => ({
      ...prev,
      email: e.target.value
  }))
}


const handleCpfChange = (e) => {
  setCustomerData(prev => ({
      ...prev,
      cpf: e.target.value
  }))
}



  // Handle telefone 
  const handleNumberChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^0-9]/gm, '');

    let num = `${val.substring(0, 3)} ${val.substring(3, 6)} ${val.substring(6, val.length)}`;
    num = num.trim();
    
    setCustomerData(prev => ({
        ...prev,
        telefone: num
    }))
  }



  const handlePasswordChange = (e) => {
    const {name, value} = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    checkPassword(customer)
  }, [customer])

  const checkPassword= (customer) => {
    if(customer.senha === customer.confirmPassword) {
      setPasswordError("")
    } else if(customer.senha !== customer.confirmPassword){
      setPasswordError("Senhas Incorretas")
    } else {
      setPasswordError("")
    }

  }
  
  function validate(){
    if(!customer.nome) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome completo!'});
    if(!customer.login) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Login!'});
    if(customer.cpf.length < 11) return setStatus({type: 'error', mensagem: 'Erro: O Campo CPF precisa ter pelo menos 11 caracteres!'});
    if(!customer.email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo E-mail!'});
    if(!customer.telefone) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Telefone!'});
    
    return true;
}


    // submit form data
    const CadastroProfile = (e) => {
      e.preventDefault();
     
      const formData = new FormData(e.target);

          fetch("http://localhost:3001/api/updateUserAdm", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  id: user.uid,
                  login: formData.get('login'),
                  nome: formData.get('nome'),
                  senha: formData.get('senha'),
                  email: formData.get('email'),
                  cpf: formData.get('cpf'),
                  telefone: formData.get('telefone')
              }),
              })
              .then((response) => response.json())
              .then(() => {
                setGuardaDados(JSON.stringify(customer))
                console.log('DADOS PROFILE ' + guardaDados)
                if(!validate()) return; else {
                  
                   const dados = {
                    uid: user.uid,
                    nome: customer.nome,
                    avatarUrl: null,
                    email: customer.email,
                    perfil: user.perfil,
                   }

                   setUser(dados)
                   storegeUser(dados)
                   
                   setCustomerData({
                     senha: '',
                     confirmPassword: ''
                   })

                  setStatus({
                    type: '',
                    mensagem: ""
                  });

                  ocultarSenha()

                  toast({
                    title: "Informações alteradas.",
                    status: "success",
                    duration: 3600,
                    isClosable: true,
                    position: 'bottom',
                  })
                }
              })
              .catch((err) => console.log("ERROR: " + err));

          
   }

 

  const handleShow = () => setMostrar(true);
  const ocultarSenha = () => setMostrar(false);

  return(

   <>
    <Header/>
    <Box 
    shadow="md"
    bborderRadius="md"
    margin="0 1rem 0rem 1rem"
    // eslint-disable-next-line react-hooks/rules-of-hooks
    bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
    >
    <Title name="Cadastro Admin">
          <FiSettings size={25} />
    </Title>
  </Box>
    <Flex
 
    align={'flex-start'}
    justify={'center'}
    >
      
    <Stack
      spacing={5}
      w={'full'}
      maxW={'60%'}
      maxH="xl"
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      rounded={'xl'}
      boxShadow={'xl'}
      p={6}
      my={10}
    >
      <Heading lineHeight={1.1} fontSize={{base: '2x1', sm: '3x1'}}>
         Cadastro
      </Heading>


      <form onSubmit={CadastroProfile}>
      {status.type === 'success' ? <p style={{ color: "green",  }}>{status.mensagem}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                              
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>
       <FormControl  >
         <FormLabel >Nome Completo</FormLabel>
         <Input 
          onFocus={() => setNomeError('')}
          placeholder='Nome Completo'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.nome  || user && user.nome}
          onChange={handleChange} 
          name="nome"
        />
   
        </FormControl>

        <FormControl  >
         <FormLabel >Login</FormLabel>
         <Input 
          onFocus={(e) => setLoginError('')}
          placeholder='Login'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.login || user.nome}
          onChange={handleChange} 
          name="login"
        />
   
        </FormControl>

      </Stack>
    
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>


<FormControl>
        <FormLabel flexDirection={'column'}>E-mail</FormLabel>
        <Input 
          placeholder='email@email.com'
          _placeholder={{color: 'gray.500'}}
          name="email"
          value={customer.email || user.email} 
          onChange={handleEmailChange} 
        />   
        </FormControl>

      <FormControl  >
        <FormLabel >CPF</FormLabel>
        <Input 
          placeholder='CPF'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          onChange={handleCpfChange}
          value={customer.cpf}
          name='cpf'
          id='cpf'
          maxLength={11}
        />   
      </FormControl>

      

      <FormControl  >
           <FormLabel >Telefone</FormLabel>
        <Input 
          placeholder='Telefone'
          _placeholder={{color: 'gray.500'}}
          type={'tel'}
          onChange={handleNumberChange}
          value={customer.telefone || user.telefone } 
          name='telefone'
          id='telefone'
          maxLength={'12'}
          
        />
      </FormControl>

        </Stack>

   
      <Button 
        mt={5} 
        onClick={handleShow}
        color={'white'}
          
      >
          Redefinir senha 
      </Button> 
      {mostrar &&
       <>
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>

      <FormControl isRequired>
        <FormLabel>Senha</FormLabel>
        {passwordError ? <span style={{color:'red'}}>{passwordError}</span> : ''}

        <InputGroup >
      
        <Input
          placeholder='Senha'
          _placeholder={{color: 'gray.500'}}
          type={showSenha ? 'text' : 'password'}
          onChange={handlePasswordChange}
          value={customer.senha} 
          name="senha"
          onFocus={(e) => setPasswordError('')}
        />

        <InputRightElement h={'full'}>
        <Button
          variant={'ghost'}
          onClick={() =>
            setShowSenha((showSenha) => !showSenha)
          }>
          {showSenha ? <ViewIcon /> : <ViewOffIcon />}
        </Button>
      </InputRightElement>
     
        </InputGroup>
  
      </FormControl>


      <FormControl  >
        <FormLabel>Confirma Senha</FormLabel>
     
      <InputGroup >
   
      <Input
        placeholder='Confirma Senha'
        _placeholder={{color: 'gray.500'}}
        type={showSenha ? 'text' : 'password'}
        onChange={handlePasswordChange}
        value={customer.confirmPassword}
        minLength="8"
     
        name="confirmPassword"
        />

      <InputRightElement h={'full'}>
      <Button
        variant={'ghost'}
        onClick={() =>
          setShowSenha((showSenha) => !showSenha)
        }>
        {showSenha ? <ViewIcon /> : <ViewOffIcon />}
      </Button>
    </InputRightElement>
   
         </InputGroup>
         </FormControl>
        </Stack>
       
      </>            
      } 

      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']} mt={5}>
      <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancelar
          </Button>
      <Button 
        bg={'green.400'}
        color={'white'}
        w="full"
        _hover={{
          bg: 'blue.500'
        }}
        type='submit'
      > Salvar</Button>
      

      </Stack>
      </form>
     
    </Stack>
    </Flex>
    </>

  )
}