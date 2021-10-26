import React, { useEffect, useState,useRef,useContext} from "react";
import axios from 'axios'
import Title from '../../components/Title';
import { 
     Box,Center,Container,Heading, Stack,Text,Button,
     HStack, VStack,
     FormLabel,
     Input,Icon,FormControl,useToast, Table,Thead,
     Tbody,Tr,
     Th,Td,
    } from "@chakra-ui/react"
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth'
import { Header } from '../../components/Header';



export default function Registrar(){
    const formRef = useRef(null)
    const toast = useToast()
    const { signOut, loadingAuth, user } = useContext(AuthContext);
  
    const [registroPonto, setRegistroPonto] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [ultimoPonto, setUltimoPonto] = useState()

    useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);  


    useEffect(() => {
      BuscarRegistroPontos()
      return() =>{

      }
    }, [])


    const locale = 'br';
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update  
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })} ${today.getFullYear()}\n\n`;
    const hour = today.getHours();
    //const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric'});
    
    //informações que vao para banco de dados 
    const timeSecunds = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
    const dataDeRegistroPonto = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    

    const handleSubmit = async ()=>{
        console.log(user.nome);        
      try{
        await axios.post("http://localhost:3001/api/baterponto", {
            nome: user.nome,
            horas: timeSecunds,
            data:  dataDeRegistroPonto,
        }).then(async (response, value) => {
            if(response.data.message){
                console.log(response.data.message)
                toast({
                  title: "Ocorrreu algum error.",
                  status: "error",
                  duration: 3600,
                  isClosable: true,
                })
             
            }else {
            toast({
              title: "Registro salvo!",
              status: "success",
              duration: 3600,
              isClosable: true,
            })
            handleMore();
          }
        });}catch(error){
            throw new Error(error.message);
        }
    }

         
    const usuario = user.nome
    console.log('nome'+usuario)
    
    
    const BuscarRegistroPontos = async ()=>{
        await axios.post('http://localhost:3001/api/buscarPontos',{
          nome:  usuario,
        })
        .then((response) => {
        updateState(response.data);
        console.log(registroPonto);
        console.log('RESPONSE: ' + JSON.stringify(response.data))
        }).catch((err) => {
          console.log('Error', err)
          setLoadingMore(false) 
        })
        setLoading(false);
      }


      async function updateState(dados){
        console.log('DADOS ' + JSON.stringify(dados)) 
        const isCollectionEmpty = dados.size === 0;
        if(!isCollectionEmpty){
          let lista = [];

          dados.forEach((element)=>{
            lista.push({
              id: element.banch_id,
              nome: element.banch_nome,
              hora: element.banch_hora,
              data: element.banch_date,
            })
          })
          const lastRegister = dados[dados.length -1]; //Pegando o ultimo documento buscado
        
          setRegistroPonto(registroPonto => [...registroPonto, ...lista]);
          setUltimoPonto(lastRegister);
          
        }else{
          setIsEmpty(true);
        }
        setLoadingMore(false);
    }

    async function handleMore(){
      setLoadingMore(true);
      await axios.post('http://localhost:3001/api/buscarPontos',{
        nome:  usuario,
      }).then((response)=>{
        updateState(response.data);
      })
      setIsEmpty(true);
    }
   

//verifincado se tem dados dos funcionarios cadastrados 
  if(loading) {
    return(
      <>
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

          <Center p={2} mb={4}>
           <Text fontSize={18} fontWeight="bold">Buscando dados...</Text>
           </Center>

        </Box>

      </Box>


      </>
    )
  }


    return(
        <>
        <Box w="100%" h="100%" bg="#f8f8f8">
          <Header/>
            <Box 
            shadow="md"
            borderRadius="md" 
            bg="#FFF"
            margin="0 1rem 0rem 1rem"
            >
                <Title name="Registro de ponto">
                <FiSettings size={25} />
                </Title>
            </Box>

            {registroPonto.length === 0 ? (
            <>
            <Container >
            <Heading fontSize="xxx-large" textAlign="center" mt={4} color="green">PluX</Heading>
            <Box p={5} shadow="md" borderWidth="1px"  borderRadius="0.6rem">
            <Stack spacing={10}>
    
            <Text  textAlign="center" fontSize="xl" color="black">{date}</Text> 
        
            <Center>
                <Text fontSize="6xl" color="black">{time}</Text>
            </Center>

            <Center>
                <Button 
                colorScheme="green"
                bg="green"  
                size="md"
                height="48px"
                width="200px"
                border="2px" 
                type="submit" 
                onClick={handleSubmit}>
                    Bater ponto
                </Button>
            </Center>
                </Stack>
                </Box>
            </Container> 
            <Table size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>                                    
                                        <Th>Hora</Th>
                                        <Th>Data</Th>
                                                             
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {registroPonto.map((item, index) =>{
                                        return(
                                          <Tr key={index}>
                                          <Td>{item.banch_nome}</Td>
                                          <Td>{item.banch_hora}</Td>
                                          <Td>                                            
                                            {item.banch_date  }
                                          </Td>
                                      </Tr> 
                                        )
                                    })
                                    }

                                                                                                   
                                </Tbody>
                            </Table>
            </> 
            ) : (
            <>
            <Container >
            <Heading fontSize="xxx-large" textAlign="center" mt={4} color="green">PluX</Heading>
            <Box p={5} shadow="md" borderWidth="1px"  borderRadius="0.6rem">
            <Stack spacing={10}>
    
            <Text  textAlign="center" fontSize="xl" color="black">{date}</Text> 
        
            <Center>
                <Text fontSize="6xl" color="black">{time}</Text>
            </Center>

            <Center>
                <Button 
                colorScheme="green"
                bg="green"  
                size="md"
                height="48px"
                width="200px"
                border="2px" 
                type="submit" 
                onClick={handleSubmit}>
                    Bater ponto
                </Button>
            </Center>
                </Stack>
                </Box>
            </Container> 
            <Table size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>                                    
                                        <Th>Hora</Th>
                                        <Th>Data</Th>
                                                             
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {registroPonto.map((item, index) =>{
                                        return(
                                          <Tr key={index}>
                                          <Td>{item.nome}</Td>
                                          <Td> {item.hora}</Td>
                                          <Td>                                            
                                            {item.data}
                                          </Td>
                                      </Tr> 
                                        )
                                    })
                                    }

                                                                                                   
                                </Tbody>
                            </Table>
            </>
            )}
        </Box>
   </>
    )
}



/**
 * 
Dentro App, temos o dateTimeestado, que criamos com o useStategancho.

Ele é definido como um objeto com as hours, minutese secondspropriedades.

Ficamos com as horas, minutos e segundos com getHours, getMinutese, getSecondsrespectivamente.

Em seguida, adicionamos o useEffectgancho para obter a última data e hora atribuídas à datevariável.

Chamamos setIntervalpara definir a última data e hora a cada segundo, conforme indicado pelo segundo argumento.

Em seguida, ligamos setDateTimecom os valores de horas, minutos e segundos.

Na última linha do useEffectretorno de chamada, retornamos uma função que chama clearIntervalcom timerpara limpar o cronômetro quando desmontamos o componente.**/