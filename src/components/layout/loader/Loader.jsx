import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const style={
    transform:'scale(4)'
}
const Loader = ({color="yellow.500"}) => {
  return (
    <VStack h={"100vh"} justifyContent={"center"}>
        <div style={style}>
            <Spinner thickness='2px' speed='0.65s' emptyColor='transparent' color={color} size="xl" />
        </div>
    </VStack>
  )
}

export default Loader