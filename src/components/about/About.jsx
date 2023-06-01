import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import dp from '../../assets/images/SnapPic Collage_20191115212737689.jpg';
import { Link } from 'react-router-dom';
import intro from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondation from "../../assets/docs/termsAndCondition.js"

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar src={dp} boxSize={['40', '48']} />
      <Text children="Co-Founder" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="M.Usman Haider" size={['md', '2xl']} />
      <Text
        children={`Hi, i am a full-stack developer and a mentor. Our mission is to provide quality content at reasonable Price.`}
        textAlign={['center', 'left']}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      controls
      loop
      src={intro}
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      autoPlay
      muted
    ></video>
  </Box>
);
const TandC = ({ termsAndCondation }) => (
  <Box>
    <Heading
      children="Terms & Condition"
      size={'md'}
      textAlign={['center', 'left']}
      my="4"
    />
    <Box h={'sm'} p="4" overflowY={'scroll'}>
      <Text
        children={termsAndCondation}
        fontFamily="heading"
        letterSpacing={'widest'}
        textAlign={['center', 'left']}
      />
      <Heading children='Refund is only applicable for cancellation within 7 days' my={'4'} size='xs' />
    </Box>
  </Box>
);
function About() {
  return (
    <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m={'8'} direction={['column', 'row']} alignItems="center">
        <Text
          children="We are a video streaming platform with some premium courses available
         only for premium users."
          fontFamily={'cursive'}
          m="8"
        />
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termsAndCondation={termsAndCondation} />
      <HStack my={'4'} padding="4">
        <RiSecurePaymentFill />
        <Heading
          children="Payment is secured by RazarPay"
          fontFamily={'sans-sarif'}
          textTransform="uppercase"
          size={'xs'}
        />
      </HStack>
    </Container>
  );
}

export default About;
