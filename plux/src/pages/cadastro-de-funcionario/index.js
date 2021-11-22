
import { useState, useContext,useEffect, useRef} from 'react'
import { Header } from '../../components/Header';
import Title from '../../components/Title';
import axios from 'axios';
import { FiSettings, FiPlusCircle } from 'react-icons/fi';
import { MdVisibility , MdSearch }  from "react-icons/md";
import { AuthContext } from '../../contexts/auth'
import {Container,
    Text,FormLabel,
    Input,Icon,
    Center,Box,
    Button,Stack,
    Table,Thead,
    Tbody,Tr,
    Th,Td,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    FormControl,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Checkbox,DrawerFooter,
    useDisclosure, Divider,useColorModeValue,
} from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import TableFixa from '../../components/jornadas/fixa'
const Profile = () => {

    const { signOut, loadingAuth, } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

    //variaveis functions
    const [jornada, setJornada] = useState([])
    const [listFuncionario, setListaFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastFuncionario,setLastFuncionario] = useState([])
    //variaveis funcionais 
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [cpf, setCpf] = useState('')


    useEffect(() => {
      loadFuncionario()
      return() =>{

      }
    }, [])


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
      });
    const toast = useToast()
    

    //modal
    const [show, setShow] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //drawer
    const [size, setSize] = useState("")
    const handleClick = () => {
      setSize("md")
      onOpen()
    }

    const formRef = useRef(null)


    //Cadastro de funcionarios/colaboradores
    const handleSubmit = async (e)=>{      
      e.preventDefault()
      if(!validate()) return;

      try{
        
        await axios.post('http://localhost:3001/api/cadFuncionario',{ 
      
        codigo: codigo, 
        nome: nome,
        email: email,
        cpf: cpf,
        celular: whatsapp,
     
        }).then( async (response, value) => {
          if(response.data.message){
              console.log(response.data.message)
              toast.error("Informe outro Login!", {
                  icon: "☹️"
              });
              toast({
                title: "Ocorrreu algum error.",
                status: "error",
                duration: 3600,
                isClosable: true,
              })
          }else {
          toast({
            title: "Dados cadastrados.",
            status: "success",
            duration: 3600,
            isClosable: true,
          })
          handleMore();
        }
      });}catch(err){
          console.log('alguim blx' + err);
          toast({
            title: "Ja existe um email cadastrado!.",
            status: "error",
            duration: 3600,
            isClosable: true,
          })
        }finally {
            setNome('');
            setEmail('');
            setCpf('');
            setCodigo('');
            setWhatsapp('');
            setStatus({
                type: '',
                mensagem: ""
              });
        }
    }    



    
  //buscando dados
   const loadFuncionario = async () =>{
    await axios.get('http://localhost:3001/api/buscarFuncionanio',{
      params: {
        _limit:4
       }
    })
    .then((response) =>{
      updateState(response.data)
      console.log('RESPONSE: ' + JSON.stringify(response.data))
    }).catch((err) => {
      console.log('Error', err)
      setLoadingMore(false)
    })
    setLoading(false);
  }

  //verifincado se tem dados dos funcionarios cadastrados 
  const updateState = async (dados) => {
    const isDataEmpty = dados.size === 0;

    if(!isDataEmpty){
      let lista = [];

      dados.forEach(element => {
        lista.push({
          id: element.fun_id,
          nome: element.fun_nome,
          email: element.fun_email,
        })
      });
      const lastFunc = dados[dados.length -1]
      setListaFuncionarios(listFuncionario => [...listFuncionario, ...lista ])
      setLastFuncionario(lastFunc)
      console.log(JSON.stringify(lista))
      console.log(JSON.stringify(listFuncionario))
    }else{  
      setIsEmpty(true)
      toast({
        title: "Não mais a dados a buscar.",
        status: "info",
        duration: 3600,
        isClosable: true,
      })
    }
    setLoadingMore(false);
  }


  function validate(){
        if(codigo.length < 4) return setStatus({type: 'error', mensagem: 'Erro: O codigo precisa ter pelo menos 4 caracteres!'});
        if(!nome) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo Nome completo!'});
        if(cpf.length < 11) return setStatus({type: 'error', mensagem: 'Erro: O codigo precisa ter pelo menos 11 caracteres!'});
        if(!email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo E-mail!'});
        if(!whatsapp) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo WhatsApp!'});
        
      
        return true;
    }


  async function handleMore(){
    setLoadingMore(true);
  
    //var isDataListFunc = listFuncionario.indexOf(listFuncionario[listFuncionario.length -1])
  
    //var isDataLastFunc = lastFuncionario[lastFuncionario.length -1]

   
      await axios.post('http://localhost:3001/api/buscarUltimoIdFunc',{
        ultimoId: lastFuncionario['fun_id'],
      }).then((response) => {
        console.log("ultimos arrays"+response.data)
        updateState(response.data)
      })
      setIsEmpty(true)
  }



  if(loading) {
    return(
      <Container>
      <Box w="100%" h="100%">
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


      </Container>
    )
  }


    return (
        <>
            <Box w="100%" h="100%">
                <Header />
               
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
         
                {listFuncionario.length === 0 ? (
                    <>
                    <Box w="100%" p={6}  >
                            <Box w="100%" h="100%" >
                                <Center p={2} mb={4}>
                                    <Text fontSize={16} fontWeight="bold">Nenhum colaborador cadastrado...</Text>
                                </Center>
                            
                                <Center>
                                    <Button leftIcon={<FiPlusCircle />} colorScheme="teal" variant="solid" onClick={handleClick}>
                                        Adicionar colaborador
                                    </Button>
                                    
                                    <Drawer  onClose={onClose} isOpen={isOpen} size={size}>
                                    <DrawerOverlay />
                                    <DrawerContent>
                                
                                    <DrawerHeader style={{fontSize: "15px"}}>Preencha as informações do colaborador que deseja cadastrar. Ele receberá instruções para ativar sua conta</DrawerHeader>
                                
                                    <DrawerBody>
                                    {status.type === 'success' ? <p style={{ color: "green",  }}>{status.mensagem}</p> : ""}
                                    {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                                    <form                                          
                                     ref={formRef} 
                                     onSubmit={handleSubmit}
                                     id="my-form"
                                     style={{textAlign: "center", display: "contents"}}
                                    >
                                  
                        
                                    <Input 
                                      mt={4}
                                      placeholder="Codigo" 
                                      value={codigo}
                                      onChange={(e) => setCodigo(e.target.value)}
                                      name="codigo"
                                      style={{border: '1px solid green'}}
                                    />

                                    
                                    <Input 
                                      mt={4}
                                      placeholder="Nome Completo" 
                                      type="text" 
                                      value={nome}
                                      onChange={(e) => setNome(e.target.value)}
                                      name="nome"
                                      style={{border: '1px solid green'}}
                                    />
                                    
                                   
                                    <Input 
                                      mt={4} 
                                      placeholder="CPF"
                                      type="text" 
                                      value={cpf}
                                      onChange={(e) => setCpf(e.target.value)}
                                      nome="cpf"
                                      style={{border: '1px solid green'}}
                                    />

                                
                                    <Input
                                      mt={4}
                                      placeholder="email" 
                                      type="email" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      name="email"
                                      style={{border: '1px solid green'}}
                                    />
                                
                                   
                                    <Input 
                                     mt={4}
                                      placeholder="WhatsApp"
                                      type="text" 
                                      value={whatsapp}
                                      onChange={(e) => setWhatsapp(e.target.value)}
                                      name="celular"
                                      style={{border: '1px solid green'}}
                                    />
                                   
                                   
                                    <Center mt={4}>
                                     <Divider orientation="horizontal"/>
                                    </Center>                        
                                  
                                    <Center mt={4}>
                                     <Button colorScheme="blue" onClick={handleShow} >Adicionar nova jornada de trabalho</Button>
                                    </Center>

                                        {show  &&
                                        <>
                                        <Modal                                        
                                        isOpen={isOpen}
                                        onClose={handleClose} 
                                        size="xl"                                             
                                        >
                                        <ModalOverlay/>
                                        <ModalContent>
                                        <ModalHeader>Adicionar nova jornada de trabalho</ModalHeader>
                                        <ModalCloseButton />

                                        <ModalBody pb={6}>

                                        <FormControl>
                                        <FormLabel>Nome da jornada</FormLabel>
                                        <Checkbox defaultIsChecked>Seg-Dom</Checkbox>
                                        </FormControl>

                                        <Center mt={4}>
                                         <Divider orientation="horizontal"/>
                                        </Center>  

                                        <Tabs mt={4} size="md" variant="enclosed">
                                        <TabList>
                                          <Tab>Fixa</Tab>
                                          <Tab>Two</Tab>
                                        </TabList>
                                        
                                        <TabPanels>
                                        
                                        <TabPanel>
                                        <p>two!</p>
                                        </TabPanel>

                                        <TabPanel>
                                        <p>two! teste</p>
                                        </TabPanel>

                                        </TabPanels>
                                        </Tabs>



                                        </ModalBody>

                                        <ModalFooter>

                                        <Button 
                                        colorScheme="blue" 
                                        mr={3} 
                                        type="submit" 
                                        onClick={() =>
                                        toast({
                                        title: "Informações salvas",
                                        description: "Enviaremos email para o usuário.",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                        })
                                        }
                                        >
                                        Save
                                        </Button>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        </ModalFooter>
                                        </ModalContent>
                                        </Modal>
                                        </>
                                        }                    

                                    {jornada.length === 0 ? (
                                    <p></p>
                                    ) : (
                                    <p>teste</p>
                                    )}                                  
                                    </form>
                                    </DrawerBody>
                                        <DrawerFooter>
                                        <Button   
                                        type="submit" 
                                        colorScheme="blue"
                                        form="my-form"   
                                        >
                                      Confirmar
                                       </Button>
                                 
                                       <Button onClick={onClose}>Cancelar</Button>
                                      </DrawerFooter>
                                    </DrawerContent>                                    
                                </Drawer>
                                </Center>
                            </Box>
                    </Box>
                    </>
                ) : (
                    <>
                    <Box w="100%" p={6}>
                        <Box w="100%" h="100%"  >
                            <Stack float="right">
                                    <Button leftIcon={<FiPlusCircle />} colorScheme="teal" variant="solid"
                                     onClick={handleClick}>
                                        Adicionar colaborador
                                    </Button>

                                    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                                    <DrawerOverlay />
                                    <DrawerContent>
                                
                                    <DrawerHeader style={{fontSize: "15px"}}>Preencha as informações do colaborador que deseja cadastrar. Ele receberá instruções para ativar sua conta</DrawerHeader>
                                
                                    <DrawerBody>
                                    {status.type === 'success' ? <p style={{ color: "green",  }}>{status.mensagem}</p> : ""}
                                    {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                                    <form                                          
                                     ref={formRef} 
                                     onSubmit={handleSubmit}
                                     id="my-form"
                                     style={{textAlign: "center", display: "contents"}}
                                    >
                                  
                        
                                    <Input 
                                      mt={4}
                                      placeholder="Codigo" 
                                      value={codigo}
                                      onChange={(e) => setCodigo(e.target.value)}
                                      name="codigo"
                                      style={{border: '1px solid green'}}
                                    />

                                    
                                    <Input 
                                      mt={4}
                                      placeholder="Nome Completo" 
                                      type="text" 
                                      value={nome}
                                      onChange={(e) => setNome(e.target.value)}
                                      name="nome"
                                      style={{border: '1px solid green'}}
                                    />
                                    
                                   
                                    <Input 
                                      mt={4} 
                                      placeholder="CPF"
                                      type="text" 
                                      value={cpf}
                                      onChange={(e) => setCpf(e.target.value)}
                                      nome="cpf"
                                      style={{border: '1px solid green'}}
                                    />

                                
                                    <Input
                                      mt={4}
                                      placeholder="email" 
                                      type="email" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      name="email"
                                      style={{border: '1px solid green'}}
                                    />
                                
                                   
                                    <Input 
                                     mt={4}
                                      placeholder="WhatsApp"
                                      type="text" 
                                      value={whatsapp}
                                      onChange={(e) => setWhatsapp(e.target.value)}
                                      name="celular"
                                      style={{border: '1px solid green'}}
                                    />
                                   
                                   
                                    <Center mt={4}>
                                     <Divider orientation="horizontal"/>
                                    </Center>                        
                                  
                                    <Center mt={4}>
                                     <Button colorScheme="blue" onClick={handleShow} >Adicionar nova jornada de trabalho</Button>
                                    </Center>
                                    {show  &&
                                    <>
                                    <Modal                                        
                                    isOpen={isOpen}
                                    onClose={handleClose}   
                                    size="xl"                                   
                                    >
                                    <ModalOverlay/>
                                    <ModalContent>
                                    <ModalHeader>Adicionar nova jornada de trabalho</ModalHeader>
                                    <ModalCloseButton />

                                    <ModalBody pb={10} >

                                    <FormControl>
                                    <FormLabel>Nome da jornada</FormLabel>
                                    <Checkbox defaultIsChecked>Seg-Dom</Checkbox>
                                    </FormControl>

                                    <Center mt={5}>
                                    <Divider orientation="horizontal"/>
                                    </Center>  

                                    <Tabs mt={5} variant="enclosed">
                                    <TabList>
                                    <Tab>Fixa</Tab>
                                    <Tab>Two</Tab>
                                    </TabList>
                                    <TabPanels>
                                    <TabPanel>
                                    <Box marginLeft={-9}>
                                    <TableFixa />
                                    </Box>

                                    </TabPanel>
                                    <TabPanel>
                                    <p>Em Breve!</p>
                                    </TabPanel>
                                    </TabPanels>
                                    </Tabs>



                                    </ModalBody>

                                    <ModalFooter>

                                    <Button 
                                    colorScheme="blue" 
                                    mr={3} 
                                    type="submit" 
                                    onClick={() =>
                                    toast({
                                    title: "Informações salvas",
                                    description: "Enviaremos email para o usuário.",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                    })
                                    }
                                    >
                                    Save
                                    </Button>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    </ModalFooter>
                                    </ModalContent>
                                    </Modal>
                                    </>
                                    }                    
                                    {jornada.length === 0 ? (
                                    <p></p>
                                    ) : (
                                    <p>teste</p>
                                    )}

                                  
                                    </form>
                                    </DrawerBody>
                                        <DrawerFooter>
                                        <Button   
                                        type="submit" 
                                        colorScheme="blue"
                                        form="my-form"   
                                        >
                                      Confirmar
                                       </Button>
                                 
                                       <Button onClick={onClose}>Cancelar</Button>
                                      </DrawerFooter>
                                    </DrawerContent>                                    
                                </Drawer>
                            </Stack>

                            <Table size="sm"  >
                                <Thead>
                                    <Tr>
                                        <Th>Nome</Th>                                    
                                        <Th>E-mail ou Telefone</Th>
                                        <Th>Tipo de usuario</Th>
                                        <Th>Departamento</Th>
                                        <Th>Turno</Th>
                                        <Th>Data de cadastro</Th>                             
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {listFuncionario.map((item, index) =>{
                                        return(
                                          <Tr key={index}>
                                          <Td data-label="">{item.nome}</Td>
                                          <Td>{item.email}</Td>
                                          <Td>                                            
                                          <Stack direction="row" spacing={4}>
                                              <Button colorScheme="yellow" variant="outline">  
                                                  <Icon as={MdVisibility} />                                  
                                              </Button>
                                              <Button  colorScheme="blue" variant="outline">
                                                  <Icon as={MdSearch} />      
                                              </Button>
                                          </Stack>
                                          </Td>
                                      </Tr> 
                                        )
                                    })

                                    }

                                                                                                   
                                </Tbody>
                                {loadingMore && <h2 style={{textAlign:'center', marginTop: 15 }}> Buscando dados...</h2>}
                                {!loadingMore && !isEmpty &&  
                                  <Box  my={4}>
                                    <Button 
                                    colorScheme="teal"
                                    onClick={handleMore}>
                                      Buscar mais
                                    </Button>
                                </Box>}
                          
                            </Table>
                           

                        </Box>
                    </Box>
                    </>

                )}



              <Center>
                <Box>
                    <Button className="logout-btn" onClick={() => signOut()} >
                        Sair
                    </Button>
                </Box>
            </Center>
            </Box>
            </>
    )
}

export default Profile