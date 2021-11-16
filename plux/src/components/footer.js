import React, {useContext} from "react";
import { Box,Button,Center} from '@chakra-ui/react'
import { AuthContext } from '../contexts/auth'
const Footer = () => {
    const { signOut} = useContext(AuthContext);

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
          <Center >
                <Box>
                    <Button colorScheme="white" bgColor="red" color="White" onClick={() => signOut()} >
                        Sair
                    </Button>
                </Box>
            </Center>
    </Box>
  )
}

export default Footer