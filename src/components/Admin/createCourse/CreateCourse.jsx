import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import cursor from "../../../assets/images/cursor.png";
import { fileUploadCss } from '../../auth/Register';


const categories = [
  'Web Devolpmnet',
  'App devolpment',
  'Data Structure & Alogorithem',
  'Data Science',
  'Aritifical Intelligence',
  'Game Devolpment',
];

const CreateCourse = () => {

  const[title,setTitle]=useState("")
  const[descrption,setDescrption]=useState("")
  const[catagory,setCatagory]=useState("")
  const[createdBy,setCreatedBy]=useState("")
  const[image,setImage]=useState("")
  const[imagePrev,setImagePrev]=useState("")
  const changeFileHandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
        setImagePrev(reader.result);
        setImage(file);
    }
  }
  return (
    <Grid minH={"100vh"} templateColumns={["1fr","5fr 1fr"]} css={{cursor:`url(${cursor}),default`}}>

    <Container py={"16"}>

    <form>
    <Heading
    textTransform={"uppercase"}
    children="create course"
    textAlign={["center","left"]}
    my={"16"}
    
     />
     <VStack m={"auto"} spacing={"8"}>
     <Input
       
       type={'text'}
       focusBorderColor="purple.300"
       value={title}
       onChange={e => setTitle(e.target.value)}
       placeholder="Title"
     />
         <Input
       
       type={'text'}
       focusBorderColor="purple.300"
       value={descrption}
       onChange={e => setDescrption(e.target.value)}
       placeholder="Descrption"
     />
         <Input
       
       type={'text'}
       focusBorderColor="purple.300"
       value={createdBy}
       onChange={e => setCreatedBy(e.target.value)}
       placeholder="Creator Name"
     />

     <Select  focusBorderColor="purple.300" value={catagory} onChange={e=>setCatagory(e.target.value)}>
      <option value={""}>Select Catagory</option>

      {
        categories.map((item=>
          <option key={item} value={item}>{item}</option>
        ))
      }
     </Select>
     <Input
            required
            accept='image/*'
            type={'file'}
            focusBorderColor="purple.300"
            id="image"
            css={{
              '&::file-selector-button':{
                ...fileUploadCss,
                color:"purple"
              }
            }}
            onChange={changeFileHandler}
        
          />

          {
            imagePrev && (
              <Image src={imagePrev} boxSize={"64"} objectFit={"contain"} />
            )
          }
          <Button w={"full"} colorScheme='purple' type='submit'>Create</Button>

     </VStack>
    </form>
  

    </Container>

    <Sidebar/>
    
    </Grid>
  )
          }
        

export default CreateCourse