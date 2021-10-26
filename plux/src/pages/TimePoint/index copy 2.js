import React, { useEffect, useState,useRef } from "react";
import Axios from 'axios'
import { 
     Box,Center,Container,Heading, Stack,Text,Button,
     HStack, VStack,
     FormLabel,
     Input,Icon,FormControl
    } from "@chakra-ui/react"

const date = new Date();


export default function Registrar(){
    const formRef = useRef(null)



    const [ dateTime, setDateTime] = useState({

        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setDateTime({
                day: date.getDay(),
                month: date.getMonth(),
                year: date.getFullYear(),
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds()
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    
    const handleSubmit = async ()=>{
        alert('CLICOU')
        console.log(dateTime)

        Axios.post("http://localhost:3001/api/register", {
    
        horas:`${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`
            
        }).then(() => {
            alert('SuccessFull insert')
        })

    }


    return(

        <Box  w="100%" p={4} color="white" id="about">
            <Container >
             <Heading fontSize="xxx-large" textAlign="center" mt={4} color="green">PluX</Heading>
             <Box p={5} shadow="md" borderWidth="1px" borderRadius="0.6rem">
             <Stack spacing={8}>
             <Center>
                <Text fontSize="xl" color="black">{`${dateTime.day}/${dateTime.month}/${dateTime.year}`}</Text>
             </Center>
            
             <Center>
                <Text fontSize="xxx-large" color="black">{`${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`}</Text>
             </Center>
            
             <form  
                ref={formRef} 
                onSubmit={handleSubmit}
                id="my-form"
                style={{textAlign: "center", display: "contents"}}
             >  
            
              <FormControl>
                <FormLabel htmlFor="name" textAlign="center" color="green">Código Empregado</FormLabel>
                <Input 
                w={100} 
                type="text"
                name="celular"
                style={{border: '1px solid green'}} 
                placeholder="Código Empregador"
               />
                <FormLabel htmlFor="name" textAlign="center" color="green"></FormLabel>
            
                <Input 
                    mt={4}
                    type="text"
                    name="celular"
                    style={{border: '1px solid green'}} 
                    placeholder="Código Empregador"
                />
            
                </FormControl>
                
             </form>
    

            <Center>
                <Button bg="green" type="submit" onClick={handleSubmit}>Gravar ponto</Button>
            </Center>
            </Stack>
             </Box>
            </Container>
            </Box>

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