import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Subscribe() {
  return (
  <Container h={"90vh"} p="14">
  <Heading children="Welcome" my={"8"} textAlign="center" />
  <VStack boxShadow={"lg"} alignItems="stretch" borderRadius={"lg"} spacing="0">
    <Box bg={"yellow.400"} p="4" css={{borderRadius:"8px 8px 0 0"}}>
    <Text color={"black"} children={`Pro Pack - $99`} />

    </Box>
    <Box p={"4"}>
    <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
    <Text  children={`Join pro pack and get access to all content`} />
    <Heading children="$99" size={"md"} />
    </VStack>
    <Button my={"8"} w="full" colorScheme={"yellow"}> Buy Now</Button>

    </Box>
    <Box bg={"blackAlpha.600"} p="4" css={{borderRadius:"0 0 8px 8px"}}>
    <Heading children="100% refund at cancellation" color={"white"} textTransform="uppercase" size={"sm"} />
    <Text children="*Terms and condation Apply" fontSize={"xs"} color="white"  />

    </Box>
  </VStack>

  </Container>
  )
}

export default Subscribe