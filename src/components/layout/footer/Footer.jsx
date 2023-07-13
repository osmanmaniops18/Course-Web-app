import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular,TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub} from "react-icons/di"

function Footer() {
  return (
    <Box padding={"4"} bg="blackAlpha.900" minHeight={"10vh"}>
    <Stack direction={["column","row"]} >
        <VStack alignItems={["center","flex-start"]} width="full">
        <Heading children="All Right Reserved" color={"white"} />
        <Heading children="@Usman.18" color={"yellow"} size="sm" fontFamily={"body"} />

        </VStack>
        <HStack spacing={["2","10"]} justifyContent="center" color={"white"} fontSize="50">
      <a href='youtube.com' target={"blank"}>
        <TiSocialYoutubeCircular />
      </a>
      <a href='instagram.com' target={"blank"}>
        <TiSocialInstagramCircular />
      </a>
      <a href='github.com' target={"blank"}>
        <DiGithub />
      </a>
        </HStack>
    </Stack>

    </Box>
  )
}

export default Footer