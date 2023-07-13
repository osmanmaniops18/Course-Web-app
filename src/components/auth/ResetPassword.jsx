import { Container, Heading, VStack,Input, Button } from '@chakra-ui/react';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom"
import { resetPassword } from '../../redux/actions/profile';
=======
import React, { useState } from 'react';
import {useParams} from "react-router-dom"
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f

function ResetPassword() {
    const [password, setPassword] = useState("")
    const params=useParams();
<<<<<<< HEAD

    const {loading,error,message}=useSelector(state=>state.profile)
    const navigate=useNavigate()
    const dispatch=useDispatch()
   
    const submitHandler=(e)=>{
     
      e.preventDefault()
      dispatch(resetPassword(params.token,password))

    }

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        navigate("/login")
      }
      
    }, [dispatch,error,message,navigate])
 
  return (
    <Container py={"16"} h="90vh">
     <form onSubmit={submitHandler}>
=======
 
  return (
    <Container py={"16"} h="90vh">
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
      <Heading
        children="Reset Password"
        textTransform={'uppercase'}
        textAlign={['center', 'left']}
        my="16"
      
      />
      <VStack spacing={"8"}>
<<<<<<< HEAD

=======
 <form>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
 <Input
            required
            type={'password'}
            focusBorderColor="yellow.500"
        
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
          />
<<<<<<< HEAD
          <Button type='submit' isLoading={loading} width={"full"} colorScheme="yellow" my={"8"}>Reset Password</Button>
          </VStack>
          </form>
      
=======
          <Button width={"full"} colorScheme="yellow" my={"8"}>Reset Password</Button>
 </form>
      </VStack>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
    </Container>
  );
}

export default ResetPassword