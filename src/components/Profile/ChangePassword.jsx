import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
    const [oldpassword,setOldPassword]=useState("");
    const [newpassword,setNewPassword]=useState("");
    const {loading,error,message}=useSelector(state=>state.profile)
    const dispatch=useDispatch()

    const updateProfileHandler=(e)=>{
      e.preventDefault();

      dispatch(changePassword(oldpassword,newpassword))
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
    

  return (
<Container py={"16"} minH="90vh">
<form onSubmit={updateProfileHandler}>
    <Heading children="change password" textTransform={"uppercase"} my="16" textAlign={["center","left"]} />
    <VStack spacing={"8"}>
    <Input
              required
              type={'password'}
              focusBorderColor="yellow.500"
              value={oldpassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Enter Old  Password"
            />
             <Input
              required
              type={'password'}
              focusBorderColor="yellow.500"
              value={newpassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter New  Password"
            />
            <Button isLoading={loading} colorScheme={"yellow"} w="full" type='submit'>Change</Button>

    </VStack>
</form>

</Container>
  )
}

export default ChangePassword