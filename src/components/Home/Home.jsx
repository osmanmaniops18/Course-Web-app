import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import vg from '../../assets/images/bg.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import intro from '../../assets/videos/intro.mp4';

function Home() {
  return (
    <>
      <section className="home">
        <div className="container">
          <Stack
            direction={['column', 'row']}
            height="100%"
            justifyContent={['center', 'space-between']}
            alignItems="center"
            spacing={['16', '56']}
          >
            <VStack width={'full'} alignItems={['center', 'flex-end']}>
              <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
              <Text fontFamily={"cursive"} fontSize="2xl" textAlign={["center","left"]} children="Find Valuable Contents At Reasonable Price" />
              <Link to="/courses">
                <Button size={'lg'} colorScheme="yellow">
                  Explore Now
                </Button>
              </Link>
            </VStack>
            <Image
              className="vector-grphic"
              boxSize={'md'}
              src={vg}
              objectFit="contain"
            />
          </Stack>
        </div>
        <Box padding={'5'} bg="blackAlpha.800">
          <Heading
            children="Our Brands"
            textAlign={'center'}
            fontFamily="body"
            color={'yellow.400'}
          />
          <HStack
            className="brands-banner"
            justifyContent={'space-evenly'}
            marginTop="5"
          >
            <CgGoogle />
            <CgYoutube />
            <SiCoursera />
            <SiUdemy />
            <DiAws />
          </HStack>
        </Box>
        <div className="container2">
          <video
            controls
            src={intro}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          ></video>
        </div>
      </section>
    </>
  );
}

export default Home;
