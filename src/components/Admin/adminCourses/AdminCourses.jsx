import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useAccordionItemState,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import img from '../../../assets/images/tim-mossholder-WE_Kv_ZB1l0-unsplash.jpg';
import CourseModal from './CourseModal';

const AdminCourses = () => {
  const course = [
    {
      _id: 'asdjhasdjasaskda',
      title: 'React Course',
      category: 'Web development',
      createdBy: 'Usman',
      poster: {
        url: img,
      },
      views: 123,
      numOfVideos: 12,
    },
  ];

  const { isOpen, onClose, onOpen } = useDisclosure();
  const viewLectureHandler = userId => {
    onOpen();
  };

  const deleteUserHandler = userId => {
    console.log(userId);
  };

  const deletelectureButtonHandler = (courseId, lectureid) => {
    console.log(courseId, lectureid);
  };

  const addLectureHandlder=(e,courseId,title,descrption,video)=>{
    e.preventDefault();
  }

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          children="all courses"
          textTransform={'uppercase'}
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={['lg', 'sm']}>
            <TableCaption textTransform={'capitalize'}>
              All available courses in the database{' '}
            </TableCaption>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody textAlign={'center'}>
              {course.map(item => (
                <Row
                  viewLectureHandler={viewLectureHandler}
                  deleteUserHandler={deleteUserHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deletelectureButtonHandler}
          id="hdasdgasjhdgash"
          addLectureHandlder={addLectureHandlder}
          courseTitle="React Course"
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, viewLectureHandler, deleteUserHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'space-between'}>
          <Button
            onClick={() => viewLectureHandler(item._id)}
            variant={'outline'}
            color={'purple.500'}
          >
            {' '}
            View Lectures
          </Button>
          <Button
            onClick={() => deleteUserHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
