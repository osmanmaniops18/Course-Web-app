import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import { fileUploadCss } from '../../auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandlder,
  courseTitle,
  lecture = [],
}) => {
  const [title, SetTitle] = useState('');
  const [descrption, SetDescrption] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  
  const changeVideoHandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
        setVideoPrev(reader.result);
        setVideo(file);
    }
  }

  const closeHandler=()=>{
    setVideoPrev("")
    SetTitle("")
    SetDescrption("")
    setVideo("")
    onClose()
  }
  return (

    <Modal
      css={{ cursor: `url(${cursor}),default` }}
      isOpen={isOpen}
      size={'full'}
      onClose={closeHandler}
      scrollBehavior='outside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>
              <Heading children="Lectures" size={'lg'} />
              <VideoCard
                title="React Intro"
                descrption="This is a intro lecture, where you will know the basic of react"
                num={1}
                lectureId="ysdjhasdsalectureIdcjbs"
                courseId={id}
                deleteButtonHandler={deleteButtonHandler}
              />
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandlder(e, id, title, descrption, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add LEcture"
                    textTransform={'uppercase'}
                    size={'md'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => SetTitle(e.target.value)}
                  />
                     <Input
                    focusBorderColor="purple.300"
                    placeholder="Descrption"
                    value={descrption}
                    onChange={e => SetDescrption(e.target.value)}
                  />

<Input
            required
            accept='video/mp4'
            type={'file'}
            focusBorderColor="purple.300"
            id="image"
            css={{
              '&::file-selector-button':{
                ...fileUploadCss,
                color:"purple"
              }
            }}
            onChange={changeVideoHandler}
        
          />

          {
            videoPrev && (
              <video controlsList='nodownload' controls src={videoPrev}></video>
            )
          }


<Button w={"full"} colorScheme='purple' type='submit'>Add Lecture</Button>

                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  descrption,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107 ,70, 193,.5  )'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading children={`#${num} ${title}`} size={'sm'} />
        <Text children={descrption} />
      </Box>

      <Button
        color="purple.600"
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
