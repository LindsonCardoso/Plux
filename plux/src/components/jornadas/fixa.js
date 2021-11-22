import {
    Container, Text,FormLabel,
    Input,Icon,
    Center,Box,
    Button,Stack,
    Table,Thead,
    Tbody,Tr,
    Th,Td,
}from '@chakra-ui/react' 


const JornadaFixa = (props) => {
    return(
        <>
        <Table>
        <Thead>
            <Tr>
                <Th>Dias da semana</Th>                                    
                <Th>Entrada</Th>
                <Th>Intervalo</Th>
                <Th>Saida</Th>
                <Th>Total de horas</Th>                     
            </Tr>
        </Thead>
        <Tbody  fontSize={13}>
                    <Tr>
                    <Td>Segunda</Td>
                    
                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:13,width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack style={{fontSize:12}} direction="row" spacing={2}>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>
                </Tr> 
                <Tr>
                    <Td>Terça</Td>
                    
                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:13,width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack style={{fontSize:12}} direction="row" spacing={2}>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>
                </Tr> 
                <Tr>
                    <Td>Quarta</Td>
                    
                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:13,width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack style={{fontSize:12}} direction="row" spacing={2}>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>
                </Tr> 
                <Tr>
                    <Td>Quinta</Td>
                    
                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:13,width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack style={{fontSize:12}} direction="row" spacing={2}>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>
                </Tr> 
                <Tr>
                    <Td>Sexta</Td>
                    
                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:13,width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack style={{fontSize:12}} direction="row" spacing={2}>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    <Input size="xs"  style={{fontSize:12, width: 50}}></Input>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00'/>
                    </Stack>
                    </Td>

                    <Td>                                            
                    <Stack direction="row">
                    <Input size="xs"  style={{fontSize:12, width: 50}} placeholder='08:00' value="8:00"/>
                    </Stack>
                    </Td>
                </Tr> 
                                                                            
        </Tbody>
    </Table>

        
        </>
    );
}

export default JornadaFixa