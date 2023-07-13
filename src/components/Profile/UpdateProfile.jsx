import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

import {useNavigate} from "react-router-dom"


const UpdateProfile = ({user}) => {
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const {loading}=useSelector(state=>state.profile)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const updateProfileHandler= async(e)=>{
      e.preventDefault();

     await dispatch(updateProfile(name,email))
     dispatch(loadUser())
     navigate("/profile")
    }


  return (
<Container py={"16"} minH="90vh">
<form onSubmit={updateProfileHandler}>
    <Heading children="Update Profile" textTransform={"uppercase"} my="16" textAlign={["center","left"]} />
    <VStack spacing={"8"}>
    <Input
       
              type={'text'}
              focusBorderColor="yellow.500"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
              <Input
       
       type={'email'}
       focusBorderColor="yellow.500"
       value={email}
       onChange={e => setEmail(e.target.value)}
       placeholder="Email"
     />
      
            <Button isLoading={loading} colorScheme={"yellow"} w="full" type='submit'>Update</Button>

    </VStack>
</form>

</Container>
  )
}

export default UpdateProfile