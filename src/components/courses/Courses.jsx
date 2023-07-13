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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToPlaylist, getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { loadUser } from '../../redux/actions/user';

function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCatogry] = useState("");
  const dispatch=useDispatch()
  const {loading,error,courses,message}=useSelector(state=>state.course)
  const categories = [
    'Web Devolpment',
    'App devolpment',
    'Data Structure & Alogorithem',
    'Data Science',
    'Aritifical Intelligence',
    'Game Devolpment',
  ];
  const addToPlaylistHandler= async(id)=>{
    
    await dispatch(addToPlaylist(id))
    dispatch(loadUser())
     
}

useEffect(()=>{
  dispatch(getAllCourses(category,keyword))
  if(error){
    toast.error(error)
    dispatch({type:"clearError"})
  }
  if(message){
    toast.success(message)
    dispatch({type:"clearMessage"})
  }

},[keyword,category,dispatch,error,message])
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
        children={`Lecture =${lectureCount}`}
        size="xs"
        textAlign={'center'}
        textTransform="uppercase"
      />
        <Heading
        children={`Views =${views}`}
        size="xs"
  
        textTransform="uppercase"
      />
      <Stack direction={["column","row"]} alignItems="center">
      <Link to={`/courses/${id}`}>
          <Button colorScheme={"yellow"}>
              Watch Now
          </Button>
          </Link>
          <Button isLoading={loading} colorScheme={"yellow"} variant="ghost" onClick={()=>addToPlaylistHandler(id)}>
             Add To Playlist
          </Button>
      

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
          {
            courses.length > 0 ? courses.map((item,index)=>(
              <Course
              key={index}
            title={item.title}
            description={item.descrption}
            views={item.views}
            imageSrc={item.poster.url}
            id={item._id}
            creator={item.createdBy}
            lectureCount={item.numOfVideos}
            addToPlaylistHandler={addToPlaylistHandler}
          />
            )):
            <Heading opacity={0.5} mt="8" children="Courses Not Found" />
          }
          
        </Stack>
      </Container>
    </>
  );
}

export default Courses;
