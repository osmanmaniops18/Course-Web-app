import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  HStack,
  Stack,
  VStack,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../assets/images/tim-mossholder-WE_Kv_ZB1l0-unsplash.jpg"

function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCatogry] = useState();
  const categories = [
    'Web Devolpmnet',
    'App devolpment',
    'Data Structure & Alogorithem',
    'Data Science',
    'Aritifical Intelligence',
    'Game Devolpment',
  ];
  const addToPlaylistHandler=()=>{
    console.log("lecture added to playlist")
}
  const Course = ({
    views,
    title,
    imageSrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    lectureCount,
  }) => {
    return (
      <VStack className="courses" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
          size="sm"
        />
        <Text noOfLines={2} children={description} />
        <HStack>
          <Text
            fontWeight={'bold'}
            children={'Created By'}
            textTransform="uppercase"
          />
          <Text
            children={creator}
            fontFamily="body"
            textTransform="uppercase"
          />
        </HStack>
        <Heading
          children={`Lecture -${lectureCount}`}
          size="xs"
          textAlign={'center'}
          textTransform="uppercase"
        />
          <Heading
          children={`Views -${views}`}
          size="xs"
    
          textTransform="uppercase"
        />
        <Stack direction={["column","row"]} alignItems="center">
        <Link to={`/courses/${id}`}>
            <Button colorScheme={"yellow"}>
                Watch Now
            </Button>
            <Button colorScheme={"yellow"} variant="ghost" onClick={()=>addToPlaylistHandler(id)}>
               Add To Playlist
            </Button>
        </Link>

        </Stack>
      </VStack>
    );
  
  };
  return (
    <>
      <Container minH={'95vh'} maxW="container.lg" padding={'8'}>
        <Heading children="All Courses" m={'8'} />
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search a Courses..."
          type={'text'}
          focusBorderColor="yellow.500"
        />
        <HStack overflowX={'auto'} paddingY="8" display={'inline-block'}>
          {categories.map((item, index) => (
            <Button
              key={index}
              onClick={() => setCatogry(item)}
              m="3"
              minW={'60'}
            >
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <Stack
          direction={['column', 'row']}
          flexWrap="wrap"
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          <Course
            title={'sample'}
            description={'sample'}
            views={'23'}
            imageSrc={img}
            id={'sample'}
            creator={'sample boy'}
            lectureCount={'2'}
            addToPlaylistHandler={addToPlaylistHandler}
          />
          
        </Stack>
      </Container>
    </>
  );
}

export default Courses;
