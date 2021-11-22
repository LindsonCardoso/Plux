import React, { useEffect, useState,useRef,useContext} from "react";
import axios from 'axios'
import Title from './Title/index';
import { 
     Box,Center,Container,Heading, Stack,Text,Button,
      useToast, Input,Icon
    } from "@chakra-ui/react"
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../contexts/auth'
import Footer from '../components/footer'



const Ponto = () => {
    const formRef = useRef(null)
    const toast = useToast()
    const { signOut, loadingAuth, user } = useContext(AuthContext);
    const [codigo, setCodigo] = useState("")
    const [dadosCodigo, setDadosCodigo] = useState([])

    useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);  



    const locale = 'br';
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update  
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })} ${today.getFullYear()}\n\n`;
    //const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric'});
    //informações que vao para banco de dados 
    const timeSecunds = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric' });
    const dataDeRegistroPonto = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    

    const handleSubmit = async (e) => {
      e.preventDefault()
        axios.post("http://localhost:3001/api/buscarCodigo", {
            codigo: codigo,
        }).then(async (response, value) => {
            if(response.data.message){
                toast({
                  title: "Codigo não existe!",
                  status: "error",
                  duration: 3600,
                  isClosable: true,
                })
            }else {
              const dateFunc =  await response.data;
               console.log(JSON.stringify(dateFunc))
               axios.post("http://localhost:3001/api/baterponto", {
                codigo:  codigo,
                nome: dateFunc[0].fun_nome,
                horas: timeSecunds,
                data:  dataDeRegistroPonto,
              }).then(async (res) => {
                toast({
                  title: "Registro salvo!",
                  status: "success",
                  duration: 3600,
                  isClosable: true,
                })

                setCodigo("");
               
              })
              
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Ops algo deu errado !", {
                icon: "☹️"
            });
        })
         

    }




    return(
        <>
        <Box w="100%" h="100%" >
            <Box 
            shadow="md"
            borderRadius="md" 
            colorScheme="teal"
            margin="0 1rem 0rem 1rem"
            >
                <Title name="Registro de ponto">
                <FiSettings size={25} />
                </Title>
            </Box>
            <Container >
            <Heading fontSize="xxx-large" textAlign="center" mt={4} color="green">PluX</Heading>
            <Box p={5} shadow="md" borderWidth="1px"  borderRadius="0.6rem">
            <Stack spacing={10}>
            <Text textAlign="center" fontSize="xl">{date}</Text> 
  
            <Center>
                <Text fontSize="6xl">{time}</Text>
            </Center>
            <Box style={{alignItems:"center",justifyContent: "center", textAlign: "center"}}>
            <Input
              placeholder="Codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              name="codigo"
            />
            </Box>
            <Center>
                <Button 
                colorScheme="green"
                bg="green"  
                size="md"
                height="48px"
                width="200px"
                border="2px" 
                type="submit" 
                color="white"
                onClick={handleSubmit}>
                    Bater ponto
                </Button>
            </Center>
                </Stack>
                </Box>
            </Container> 

            <Container maxW="container.md" pt={14}>
              <Footer />
            </Container>
        </Box>
   </>
    )
}

export default Ponto

/**
 * 
Dentro App, temos o dateTimeestado, que criamos com o useStategancho.

Ele é definido como um objeto com as hours, minutese secondspropriedades.

Ficamos com as horas, minutos e segundos com getHours, getMinutese, getSecondsrespectivamente.

Em seguida, adicionamos o useEffectgancho para obter a última data e hora atribuídas à datevariável.

Chamamos setIntervalpara definir a última data e hora a cada segundo, conforme indicado pelo segundo argumento.

Em seguida, ligamos setDateTimecom os valores de horas, minutos e segundos.

Na última linha do useEffectretorno de chamada, retornamos uma função que chama clearIntervalcom timerpara limpar o cronômetro quando desmontamos o componente.**/