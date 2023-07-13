import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {RiCheckboxCircleFill} from "react-icons/ri"
import { Link } from 'react-router-dom';

const PaymentSucess = () => {
  return (
   <Container h={"90vh"}  p="14">
  <Heading my={"8"} textAlign="center" textTransform={"capitalize"}>You Have pro pack </Heading>
  <VStack boxShadow={"lg"} pb="16" alignItems={"center"} borderRadius="lg">
    <Box bg={"yellow.400"} w="full" p={"4"} css={{borderRadius:"8px 8px 0 0"}}>
      <Text color={"black"} children="Payment Success"/>
    </Box>
    <Box p={"4"}>
      <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
        <Text children="Congratulation tou were a pro member. You have access to premium " />
        <Heading size={"4xl"}>
          <RiCheckboxCircleFill />
        </Heading>
      </VStack>
    </Box>
    <Link to="/profile">
      <Button variant={"ghost"}>Go to profile</Button>
    </Link>
    <Heading size={"xs"}> Reference:jahdadhadaklas </Heading>
  </VStack>
   </Container>
  )
}

export default PaymentSucess