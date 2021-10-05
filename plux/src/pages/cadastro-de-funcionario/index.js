
import { useState, useContext } from 'react'
import { Header } from '../../components/Header';
import Title from '../../components/Title';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
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




export default function Profile() {

    const { signOut, loadingAuth } = useContext(AuthContext);

    const [funcionarios, setFuncionarios] = useState([1]);



    return (
  
            <Box w="100%" h="100%" bg="#f8f8f8">
                <Header />
               
                    <Box 
                    shadow="md"
                    borderRadius="md" 
                    bg="#FFF"
                    margin="0 1rem 0rem 1rem"
                   
                    >
                     <Title name="Cadastro de colaboradores">
                            <FiSettings size={25} />
                     </Title>
                    </Box>
         
                {funcionarios.length === 0 ? (
                    <Box w="100%" p={6}  >
                            <Box w="100%" h="100%" >
                                <Center p={2} mb={4}>
                                    <Text fontSize={16} fontWeight="bold">Nenhum colaborador cadastrado...</Text>
                                </Center>
                            
                                <Center>
                                    <Button leftIcon={<FiPlusCircle />} colorScheme="teal" variant="solid">
                                        Adicionar colaborador
                                    </Button>
                                </Center>
                            </Box>
                    </Box>
                ) : (

                    <>
                    <Box w="100%" p={6}  >
                        <Box w="100%" h="100%" >
                            <Stack float="right" >
                                <Button  leftIcon={<FiPlusCircle />} colorScheme="teal" variant="solid">
                                Adicionar colaborador
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                    </>

                )}



                <div className="container">
                    <button className="logout-btn" onClick={() => signOut()} >
                        Sair
                    </button>
                </div>

            </Box>
     
    )
}