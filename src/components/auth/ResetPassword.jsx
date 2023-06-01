import { Container, Heading, VStack,Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import {useParams} from "react-router-dom"

function ResetPassword() {
    const [password, setPassword] = useState("")
    const params=useParams();
 
  return (
    <Container py={"16"} h="90vh">
      <Heading
        children="Reset Password"
        textTransform={'uppercase'}
        textAlign={['center', 'left']}
        my="16"
      
      />
      <VStack spacing={"8"}>
 <form>
 <Input
            required
            type={'password'}
            focusBorderColor="yellow.500"
        
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
          />
          <Button width={"full"} colorScheme="yellow" my={"8"}>Reset Password</Button>
 </form>
      </VStack>
    </Container>
  );
}

export default ResetPassword