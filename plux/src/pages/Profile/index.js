
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
  InputGroup
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  

export default function Profile(){

  const { user, signOut, setUser, storegeUser, cadEmpresa, loadingAuth } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  //const [nome, setNome] = useState(user && user.nome);
  const [senha, setSenha] = useState(user && user.nome);

  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [mostrar, setMostrar] = useState(false);



  const Dados = (e) => {

    e.preventDefault();
    if(nome !== '' && cpf  !== ''&& email   !== '' && senha !== '' && telefone !== '') {
      cadEmpresa(nome,cpf,email,senha,telefone);
    }
    console.log(nome,cpf,email,senha,telefone)
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
    <Title name="Cadastro de colaboradores">
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


      <form>

      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>
       <FormControl isRequired >
         <FormLabel >Nome Completo</FormLabel>
         <Input 
          placeholder='Nome Completo'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          onChange={e => setNome(e.target.value)}
          value={nome} 
      
        />
   
        </FormControl>

        <FormControl>
        <FormLabel flexDirection={'column'}>E-mail</FormLabel>
        <Input 
          placeholder='email@email.com'
          _placeholder={{color: 'gray.500'}}
          type={'email'}
          onChange={e => setEmail(e.target.value)}
          value={email} 
        />   
        </FormControl>
      </Stack>
    
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}>

<FormControl isRequired >
        <FormLabel >CPF</FormLabel>
        <Input 
          placeholder='CPF'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          onChange={e => setCpf(e.target.value)}
          value={cpf} 
        />   
      </FormControl>

      <FormControl isRequired >
           <FormLabel >Telefone</FormLabel>
        <Input 
          placeholder='Telefone'
          _placeholder={{color: 'gray.500'}}
          type={'tel'}
          onChange={e => setTelefone(e.target.value)}
          value={telefone} 
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
        <InputGroup >
      
        <Input
          placeholder='Senha'
          _placeholder={{color: 'gray.500'}}
          type={showSenha ? 'text' : 'password'}
          onChange={e => setSenha(e.target.value)}
          value={senha} 
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


      <FormControl isRequired >
        <FormLabel>Senha</FormLabel>
      <InputGroup >
      
      <Input
        placeholder='Senha'
        _placeholder={{color: 'gray.500'}}
        type={showSenha ? 'text' : 'password'}
        onChange={e => setSenha(e.target.value)}
        value={senha} 
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
        onClick={ocultarSenha}
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