import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Contact() {

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [message,setMessage]=useState("")
  return (
    <Container h={"92vh"}>
    <VStack h={"full"} justifyContent="center" spacing={"16"}>
    <Heading  children="Contact US" />

<form style={{ width: '100%' }}>
<Box my={'4'}>
    <FormLabel htmlFor="name" children="Name" />
    <Input
      required
      type={'text'}
      focusBorderColor="yellow.500"
      id="name"
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Abc"
    />
  </Box>
  <Box my={'4'}>
    <FormLabel htmlFor="email" children="Email Address" />
    <Input
      required
      type={'email'}
      focusBorderColor="yellow.500"
      id="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="abc@gmail.com"
    />
  </Box>
  <Box my={'4'}>
    <FormLabel htmlFor="message" children="Message" />
    <Textarea
      required
      focusBorderColor="yellow.500"
      id="message"
      value={message}
      onChange={e => setMessage(e.target.value)}
      placeholder="Your Message"
    />
  </Box>



  <Button my={'4'} type="submit" colorScheme={'yellow'}>
    Send Message
  </Button>

  <Box my={"4"}>
    Request for Course {' '}
    <Link to={'/request'}>
      {' '}
      <Button variant={'link'} colorScheme="yellow">
        Click
      </Button>{" "}
      here
    </Link>
  </Box>
  
</form>
    </VStack>
       
    </Container>
  )
}

export default Contact