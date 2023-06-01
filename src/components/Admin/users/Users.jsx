import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useAccordionItemState } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../Sidebar'
import cursor from "../../../assets/images/cursor.png";
import { RiDeleteBin7Fill } from 'react-icons/ri';

const Users = () => {


  const users=[{
    _id:"asdjhasdjasaskda",
    name:"Usman",
    email:"fakeperson@gmail.com",
    role:"admin",
    subscrption:{
      status:"active"
    },
    
  }]


  const updateHandler=(userId)=>{
  console.log(userId)
  }

  const deleteUserHandler=(userId)=>{
    console.log(userId)
    }
  return (
    <Grid minH={"100vh"} templateColumns={["1fr","5fr 1fr"]} css={{cursor:`url(${cursor}),default`}}>

    <Box p={["0","16"]} overflowX={"auto"}>
    

    <Heading children="all users" textTransform={"uppercase"} my={"16"} textAlign={["center","left"]} />

    <TableContainer w={["100vw","full"]} >

      <Table variant={"simple"} size={["lg","sm"]}>
      <TableCaption textTransform={"capitalize"}>All available users in the database </TableCaption>
     

      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Subscrption</Th>
          <Th isNumeric>Action</Th>
        </Tr>
      </Thead>
      <Tbody textAlign={"center"}>
       {
        users.map((item)=>(
          <Row updateHandler={updateHandler} deleteUserHandler={deleteUserHandler} key={item._id} item={item} />
        ))
       }
      </Tbody>

      </Table>
    </TableContainer>


    </Box>

    <Sidebar/>
    
    </Grid>
  )
}

export default Users



function Row({item,updateHandler,deleteUserHandler}){
  return(
    <Tr>
  <Td>#{item._id}</Td>
  <Td>{item.name}</Td>
  <Td>{item.email}</Td>
  <Td>{item.role}</Td>
  <Td>{item.subscrption.status==="active" ? "Active":"Not Active"}</Td>
  <Td isNumeric>
    <HStack justifyContent={"space-between"}>
    <Button onClick={()=>updateHandler(item._id)} variant={"outline"} color={"purple.500"} > Change Role</Button>
    <Button onClick={()=>deleteUserHandler(item._id)} color={"purple.600"}>
      <RiDeleteBin7Fill />
    </Button>

    </HStack>
  </Td>
    </Tr>
  )
}