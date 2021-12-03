
import React, { useState, useContext, useEffect } from 'react'
import { Header } from '../../components/Header';
import Title from '../../components/Title';
import axios from 'axios';
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
  useToast,
  effect
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ApiCep from '../../services/ApiCep'


export default function DadosEmpresa(){
  const toast = useToast()
  const { user, signOut, setUser, storegeUser, cadEmpresa, loadingAuth } = useContext(AuthContext);
  const [guardaDados, setGuardaDados] = useState([])
  const [exibiDados, setExibiDados ] = useState({})
  
  const [customer, setCustomerData] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    cnpj: "",
    numero: "",
    complemento: "",
    dadoCep: {}
  });

  const [disable, setDisable] = useState(false);

  //const [showSenha, setShowSenha] = useState(false)
  //const [mostrar, setMostrar] = useState(false);
  //const [nome, setNome] = useState(user && user.nome);
  // error fields to display on form
    

  const handleDisable = () => setDisable(!disable);
  const handleOnDisable = () => setDisable(disable);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

 
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

  //CEP
  const [endereco, setEndereco ] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  })

  const handleDadosCep = (e) => {
    const cep = e.target.value;
    ApiCep.SearchCep(cep)
    .then(res => {
      let rua   =res.data.logradouro
      let bairro = res.data.bairro
      let cidade = res.data.localidade
      let estado = res.data.uf
      setEndereco({
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      })
      
      console.log("DADOS de endereço" + JSON.stringify(endereco))
      
    }).catch(err => {
      console.log(err)
    })
  }

  function validate(){
    if(!customer.razaoSocial) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Razão Social!'});
    if(!customer.nomeFantasia) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome Fantacia !'});
    if(customer.cnpj.length < 14) return setStatus({type: 'error', mensagem: 'Erro: O Campo CNPJ precisa ter pelo menos 14 Digitos!'});
    if(!customer.email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo E-mail!'});
    if(!customer.telefone) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Telefone!'});
    if(!customer.numero) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Numero!'});
    return true;
  }







    // submit form data
    const CadastroEmpresa = async (e) => {
      e.preventDefault();     
      setCustomerData(prev => ({
          ...prev,
          dadoCep: {endereco}
      }))

      console.log("DADOS DO CUS ANTES DE ENTRAR NO CADASTEO" + JSON.stringify(customer))
      const formData = new FormData(e.target);

      try{
        
        await axios.post('http://localhost:3001/api/empresa',{ 
          razaoSocial: formData.get('razaoSocial'),
          nomeFantasia: formData.get('nomeFantasia'),
          cidade: endereco.cidade,
          email: formData.get('email'),
          cnpj: formData.get('cnpj'),
          telefone: formData.get('telefone'),
          numero: formData.get('numero'),
          complemento: formData.get('complemento')
        }).then(async (response) => {
            if(response.data.message){     
                console.log('response'+response.data.message)
                toast({
                  title: "Dados ja cadastrados, Click em ALTERAR.",
                  status: "warning",
                  duration: 3600,
                  isClosable: true,
                })
           } else {
             axios.post('http://localhost:3001/api/DadosEmpresa',{ 
              nomeEmpresa: formData.get('razaoSocial')
              }).then( async (response, value) => { 
                const InforEmpresa = await response.data;
                setGuardaDados(JSON.stringify(customer))
                console.log('DADOS DE TUDO ' + JSON.stringify(InforEmpresa))
                if(!validate()) return; else {
                  let data = {
                    ...user,
                    razaoSocial: customer.razaoSocial,
                    nomeFantasia:  customer.nomeFantasia,
                    email: customer.email,
                    telefone: customer.telefone,
                    numero: customer.numero,
                    complemento: customer.complemento,
                    cnpj: customer.cnpj,
                    rua: endereco.rua,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    estado: endereco.estado,
                    codigoEmp: InforEmpresa[0].emp_id
                  }
                  setUser(data)
                  storegeUser(data)
                  toast({
                    title: "Informações salvas.",
                    status: "success",
                    duration: 3600,
                    isClosable: true,
                    position: 'bottom',
                  })
                }
                

              })
          
        }
      });//then
    }catch(err){
      console.log("ERROR: " + err);
      toast({
        title: "Ocorreu algum erro tente mais tarde.",
        status: "error",
        duration: 3600,
        isClosable: true,
      })
    }finally {
      setStatus({
        type: '',
        mensagem: ""
      });
    }
   }

   const AlterarEmpresa = (e) => {


   }

  //const handleShow = () => setMostrar(true);
  //const ocultarSenha = () => setMostrar(false);

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
        direction={['column', 'row']}
      >
       <FormControl  >
         <FormLabel >Razão Social</FormLabel>
         <Input 
          placeholder='Nome Completo'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.razaoSocial || user.razaoSocial}
          onChange={handleChange} 
          disabled={!disable} 
          name="razaoSocial"
        />
        </FormControl>

        <FormControl>
         <FormLabel >Nome Fantasia</FormLabel>
         <Input 
          placeholder='Nome Fantacia'
          _placeholder={{color: 'gray.500'}}
          type={'text'}
          value={customer.nomeFantasia || user.nomeFantasia}
          onChange={handleChange} 
          name="nomeFantasia"
          disabled={!disable} 
        />
        </FormControl>
      </Stack>
    
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}
      >
        <FormControl>
          <FormLabel flexDirection={'column'}>E-mail</FormLabel>
          <Input 
            placeholder='email@email.com'
            _placeholder={{color: 'gray.500'}}
            name="email"
            value={customer.email || user && user.email} 
            onChange={handleEmailChange} 
            disabled={!disable} 
          />
        </FormControl>

        <FormControl>
          <FormLabel>CNPJ</FormLabel>
          <Input 
            placeholder='CNPJ'
            _placeholder={{color: 'gray.500'}}
            type={'text'}
            onChange={handleCnpjChange}
            value={customer.cnpj || user && user.cnpj}
            name='cnpj'
            id='cnpj'
            maxLength={14}
            disabled={!disable} 
          />   
        </FormControl>

  
        <FormControl  >
          <FormLabel>Telefone</FormLabel>
          <Input 
            placeholder='Telefone'
            _placeholder={{color: 'gray.500'}}
            type={'tel'}
            onChange={handleNumberChange}
            value={customer.telefone || user && user.telefone} 
            name='telefone'
            id='telefone'
            maxLength={'12'}
            disabled={!disable} 
          />
        </FormControl>
      </Stack>
        
      <Stack 
        spacing={6} 
        mt={4} 
        direction={['column', 'row']}
      >

        <FormControl isRequired>
          <FormLabel>Cep</FormLabel>
          <Input 
            placeholder='CEP'
            _placeholder={{color: 'gray.500'}}
            type={'text'}
            onBlur={(e) => {handleDadosCep(e)}}

          />
        </FormControl>

        <FormControl>
          <FormLabel>Endereço</FormLabel>
          <Input 
            placeholder='Rua'
            _placeholder={{color: 'gray.500'}}
            type={'text'}
            value={endereco.rua || user && user.rua}
            disabled
          />
        </FormControl>
      
        <FormControl>
          <FormLabel >Bairro</FormLabel>
          <Input 
            placeholder='Bairro'
            _placeholder={{color: 'gray.500'}}
            type={'text'}
            value={endereco.bairro || user && user.bairro}
            disabled
          />
        </FormControl>

        <FormControl>
          <FormLabel >Cidade</FormLabel>
          <Input 
            placeholder='Bairro'
            _placeholder={{color: 'gray.500'}}
            type={'text'}
            value={endereco.cidade || user && user.cidade}
            disabled
          />
        </FormControl>
      </Stack>

          
      <Stack 
        spacing={6}
        mt={4} 
       >
        <HStack>
          <Box>
            <FormControl>
            <FormLabel>Numero</FormLabel>
            <Input 
              placeholder='Numero'
              _placeholder={{color: 'gray.500'}}
              type={'text'}
              width={'80px'}
              value={customer.numero || user && user.numero}
              onChange={handleChange} 
              name="numero"
            />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Complemento</FormLabel>
                <Input 
                  placeholder='Complemento'
                  _placeholder={{color: 'gray.500'}}
                  type={'text'}
                  width={'80px'}
                  value={customer.complemento || user && user.complemento}
                  onChange={handleChange} 
                  name="complemento"
                />
            </FormControl>
          </Box>
        </HStack>
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
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleDisable}
            >
            Alterar
          </Button>
       <Button 
        bg={'green.400'}
        color={'white'}
        w="full"
        _hover={{
          bg: 'blue.500'
        }}
        type='submit'
          onClick={handleOnDisable}
        > Salvar</Button>
     

      </Stack>
      </form>
     
    </Stack>
    </Flex>
    </>

  )
}