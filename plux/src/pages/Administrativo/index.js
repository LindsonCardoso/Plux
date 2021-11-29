
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
  

export default function DadosEmpresa(){

  const { user, signOut, setUser, storegeUser, cadEmpresa, loadingAuth } = useContext(AuthContext);
  const [guardaDados, setGuardaDados] = useState([])
  
  const [customer, setCustomerData] = useState({
    razaoSocial: "",
    nomeFantacia: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    logradouro: "",
    complemento: "",
    numero: "",
    cnpj: ""
  });


  const [showSenha, setShowSenha] = useState(false)
  const [mostrar, setMostrar] = useState(false);
  //const [nome, setNome] = useState(user && user.nome);
    // error fields to display on form
    
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


const handleCnpjChange = (e) => {
  setCustomerData(prev => ({
      ...prev,
      cnpj: e.target.value
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



  
  function validate(){
    if(!customer.razaoSocial) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Razão Social!'});
    if(!customer.nomeFantasia) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome Fantacia !'});
    if(customer.cnpj.length < 14) return setStatus({type: 'error', mensagem: 'Erro: O Campo CNPJ precisa ter pelo menos 14 Digitos!'});
    if(!customer.email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo E-mail!'});
    if(!customer.telefone) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Telefone!'});
    
    return true;
}


    // submit form data
    const CadastroEmpresa = (e) => {
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
    <Title name="Cadastro Empresa">
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
 


      <form onSubmit={CadastroEmpresa}>
      {status.type === 'success' ? <p style={{ color: "green",  }}>{status.mensagem}</p> : ""}
      {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                              
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>
       <FormControl  >
         <FormLabel >Razão Social</FormLabel>
         <Input 
          placeholder='Nome Completo'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.razaosocial}
          onChange={handleChange} 
          name="razaosocial"
        />
   
        </FormControl>

        <FormControl  >
         <FormLabel >Nome Fantasia</FormLabel>
         <Input 
          placeholder='Nome Fantacia'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.login || user.nome}
          onChange={handleChange} 
          name="nomeFantasia"
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

      <FormControl>
        <FormLabel >CNPJ</FormLabel>
        <Input 
          placeholder='CPF'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          onChange={handleCnpjChange}
          value={customer.cnpj}
          name='cnpj'
          id='cnpj'
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