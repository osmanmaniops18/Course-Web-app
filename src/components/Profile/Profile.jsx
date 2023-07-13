import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {RiDeleteBin7Fill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePicture } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
<<<<<<< HEAD
import { removeFromPlaylist } from '../../redux/actions/course'
=======
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f


const Profile = ({user}) => {
 const dispatch=useDispatch()
 const {loading,message,error}=useSelector(state=>state.profile)
<<<<<<< HEAD
  const removeFromPlaylistHandler= async id=>{
   await dispatch(removeFromPlaylist(id))
   dispatch(loadUser())
  
  }
=======
  const removeFromPlaylistHandler=id=>{console.log(id)}
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
  const changeImageSubmitHandler=async (e,img)=>{
    e.preventDefault()
    const myForm=new FormData();

    myForm.append('file',img)
    await dispatch(updateProfilePicture(myForm))
    dispatch(loadUser())
  

  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
    
  }, [dispatch,error,message])

  const {isOpen,onClose,onOpen}=useDisclosure()
  return (
    <Container minH={"90vh"} maxW="container.lg" py={"8"}>
    <Heading children="Profile" textTransform={"uppercase"} m="8" />
    <Stack justifyContent={"flex-start"} alignItems="center" direction={["column","row"]} spacing={["8","16"]} padding="8" >
      <VStack>
        <Avatar boxSize={"48"} src={user.avatar.url} />
        <Button onClick={onOpen} colorScheme={"yellow"} variant="ghost" >
          Change Photo
        </Button>

      </VStack>
      <VStack spacing={"4"} alignItems={["center","flex-start"]} >
        <HStack>
          <Text children="Name" fontWeight={"bold"} />
          <Text children={user.name} />
        </HStack>
        <HStack>
          <Text children="Email" fontWeight={"bold"} />
          <Text children={user.email} />
        </HStack>
        <HStack>
          <Text children="CreatedAt" fontWeight={"bold"} />
          <Text children={user.createdAt.split("T")[0]} />
        </HStack>
        
          {user.role !=="admin" &&(
        <HStack>
          <Text fontWeight={"bold"}>
            Subscrption
          </Text>
          { user.subscrption && user.subscrption.status ==="active" ? (
            <Button color={"yellow.500"} variant="unstyled">Cancel Subscrption</Button>
          ):(
            <Link to="/subscribe">
              <Button colorScheme={"yellow"}>Subscribe</Button>
            </Link>
          )}
        </HStack>
          )}
          <Stack alignItems="center" direction={["column","row"]}>
            <Link to={"/updateprofile"}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={"/changepassword"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
    
      </VStack>
    </Stack>
    <Heading children="Playlist" size="md" my="8" />
    {
      user.playlist.length > 0 && (
        <Stack alignItems="center" direction={["column","row"]} flexWrap="wrap" p={"4"}>
        {
<<<<<<< HEAD
          user.playlist.map((element,index)=>(
            <VStack key={index} w={"48"} m="2" >
=======
          user.playlist.map((element)=>(
            <VStack w={"48"} m="2" key={element.course}>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
              <Image boxSize={"full"} objectFit="contain" src={element.poster}/>
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
<<<<<<< HEAD
                <Button isLoading={loading} onClick={()=>removeFromPlaylistHandler(element.courseId)}>
=======
                <Button onClick={()=>removeFromPlaylistHandler(element.course)}>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
                  <RiDeleteBin7Fill/>
                </Button>
              </HStack>
            </VStack>
          ))
        }


        </Stack>
      )
    }

    <ChangePhoto changeImageSubmitHandler={changeImageSubmitHandler}  isOpen={isOpen} onClose={onClose} loading={loading} />

    </Container>
  )
}

export default Profile

const fileUploadCss={
  cursor:"pointer",
  marginLeft:"-5%",
  marginTop:"5px",
  width:"110%",
  border:"none",
  color:"#ECC94B",
  backgroundColor:"white"

}



function ChangePhoto({isOpen,onClose,changeImageSubmitHandler,loading})



{
  
const [imagePrev,setImagePrev]=useState("")
const [image,setImage]=useState("")

  const changeImage=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
        setImagePrev(reader.result);
        setImage(file);
    }
}

const closeHandler=()=>{
  onClose();
  setImagePrev("")
  setImage("")
}
  return(
  <Modal isOpen={isOpen} onClose={closeHandler}>
    <ModalOverlay backdropFilter={"blur(10px)"} />
    <ModalContent>
    <ModalHeader>Change Photo</ModalHeader>
      <ModalCloseButton onClick={closeHandler} />
      <ModalBody>
        <Container>
          <form onSubmit={e=>changeImageSubmitHandler(e,image)}>
            <VStack spacing={"8"}>
          {imagePrev &&     <Avatar src={imagePrev} boxSize={"48"} />}
              <Input type={"file"} css={{"&::file-selector-button":fileUploadCss}}
              onChange={changeImage}
               />
              <Button isLoading={loading} w={"full"} colorScheme="yellow" type='submit' >Change Photo</Button>
            </VStack>
          </form>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={closeHandler} mr="3">Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}