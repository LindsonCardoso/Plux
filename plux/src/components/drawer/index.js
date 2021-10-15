import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,Stack,
    DrawerOverlay,FormLabel,
    DrawerContent,Input,Box,InputLeftAddon,
    DrawerCloseButton,useDisclosure,Button,InputGroup,InputRightAddon,Select
  } from "@chakra-ui/react"
import { useState, useContext, useRef} from 'react'


export const DrawerR = () =>{

    const [size, setSize] = useState("md")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mostrar, setMostra] = useState(false)
    const sizes = "md"

    const handleClick = (newSize) => {
      setSize(newSize)
      onOpen()
    }
    return (
       <>
        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{`${size} drawer contents`}</DrawerHeader>
          
          <DrawerBody>  
          </DrawerBody>
        </DrawerContent>
        </Drawer>
      </>
    )
}