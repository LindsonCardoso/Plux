
import { useState, useContext } from 'react'
import './profile.css';
import { Header } from '../../components/Header';
import Title from '../../components/Title';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { FiSettings } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth'
import {
  FormControl,
  FormLabel,
  Text,
  Divider,
  Input,
  Flex,
  Center,
  Heading,
  Box,
  SimpleGrid,
  Button,
  Stack
} from "@chakra-ui/react"




export default function Profile(){

  const { user, signOut, setUser, storegeUser, cadEmpresa, loadingAuth } = useContext(AuthContext);

  const [nomeEmpresa, setNomeEmpresa] = useState(user && user.nomeEmpresa);
  const [email, setEmail] = useState(user && user.email);
  //const [nome, setNome] = useState(user && user.nome);
  const [razaoSocial, setRazaoSocial] = useState(user && user.razaoSocial);
  const [cnpj, setCnpj] = useState(user && user.CNPJ);
  const [ie, setIe] = useState(user && user.IE);
  const [ramoAtividade, setRamoAtividade] = useState(user && user.ramoAtividade);

  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('')
  
  
  const Dados = (e) => {

    e.preventDefault();
    if(nomeEmpresa !== '' && razaoSocial  !== ''&& cnpj   !== ''&& ie !== '' && email !== '') {
      cadEmpresa(nomeEmpresa,razaoSocial,cnpj,ie, email);
    }
    console.log(nomeEmpresa,razaoSocial,cnpj,ie, email)
  }


  return(
  <Box>
    <Header/>
    <Flex > 
     <Box flex="1" >  
      <Title name="Editar dados da empresa">
        <FiSettings size={25} />
      </Title>
     </Box>
    </Flex>

    <Box w="100%"  p={6}  >
     <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
 
      <Box w="100%" h="100%" >
      <Stack pl={3}>
        <Text as="h1"  pt={5} fontSize="30px" >
         Dados da Empresa
        </Text>
       </Stack>
       <Center  height="20px">
    
        <Divider orientation="vertical" />
       </Center>
       <Center>

   

       <form onSubmit={Dados} >
       <FormControl isRequired>
          <FormLabel>Nome da Empresa</FormLabel>
          <Input
            type="text"
            placeholder="Digite"
            size="lg"
            onChange={e => setNomeEmpresa(e.target.value)}
            value={nomeEmpresa} 
            variant="filled"
          /> 
        </FormControl>

        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>

       <FormControl isRequired>
         <FormLabel>E-mail</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          onChange={e => setEmail(e.target.value)}
          value={email} 
          variant="filled"
          isDisabled={true}
         /> 
        </FormControl>

        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>Razão social</FormLabel>
          <Input
          type="text"
          placeholder="Digite"
          size="lg"
          onChange={e => setRazaoSocial(e.target.value)}
          value={razaoSocial} 
          variant="filled"
          /> 
        </FormControl>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>CPNJ</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          variant="filled"
          onChange={e => setCnpj(e.target.value)}
          value={cnpj} 
         /> 
        </FormControl>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>Inscrição Estadual</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          variant="filled"
          onChange={e => setIe(e.target.value)}
          value={ie} 
         /> 
        </FormControl>
   
          
          <Button mt={4} colorScheme="teal" type="submit">
          {loadingAuth ? 'Salvando...' : 'Salvar'}
      </Button>
          </form>
          </Center>
      </Box>
   

      <Box w="100%" h="100%" >
      <Stack pl={3}>
        <Text as="h1"  pt={5} fontSize="30px" >
         Contato
        </Text>
       </Stack>
       <Center height="20px">
        <Divider orientation="vertical" />
       </Center>
       <Center>
       <form onSubmit={Dados} >
       <FormControl isRequired>
          <FormLabel>Telefone</FormLabel>
          <Input
            type="text"
            placeholder="Digite"
            size="lg"
            onChange={e => setTelefone(e.target.value)}
            value={telefone} 
            variant="filled"
          /> 
        </FormControl>

        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>

       <FormControl isRequired>
         <FormLabel>E-mail</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          onChange={e => setCep(e.target.value)}
          value={cep} 
          variant="filled"
          isDisabled={true}
         /> 
        </FormControl>

        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>Razão social</FormLabel>
          <Input
          type="text"
          placeholder="Digite"
          size="lg"
          onChange={e => setEndereco(e.target.value)}
          value={endereco} 
          variant="filled"
          /> 
        </FormControl>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>CPNJ</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          variant="filled"
           
         /> 
        </FormControl>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        <FormControl isRequired>
         <FormLabel>Inscrição Estadual</FormLabel>
         <Input
          type="text"
          placeholder="Digite"
          size="lg"
          variant="filled"
          onChange={e => (e.target.value)}
        
         /> 
        </FormControl>
   
          
          <Button mt={4} colorScheme="teal" type="submit">
          {loadingAuth ? 'Salvando...' : 'Salvar'}
      </Button>
          </form>
          </Center>
      </Box>
       </SimpleGrid>
   </Box>  

   <Center>
                <Box>
                    <Button className="logout-btn" onClick={() => signOut()} >
                        Sair
                    </Button>
                </Box>
            </Center>

  </Box>

  )
}