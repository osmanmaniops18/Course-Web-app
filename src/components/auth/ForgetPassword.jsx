import { Container, Heading, VStack,Input, Button } from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../redux/actions/profile';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

function ForgetPassword({isAutenticated}) {
    const [email, setEmail] = useState("")
    const {loading,error,message}=useSelector(state=>state.profile)
    const navigate=useNavigate()
    const dispatch=useDispatch()
   
    const submitHandler=(e)=>{
<<<<<<< HEAD
     
=======
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
      e.preventDefault()
      dispatch(forgetPassword(email))

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

    useLayoutEffect(()=>{
      if(isAutenticated){
        navigate("/profile")

      }

    },[isAutenticated,navigate])

<<<<<<< HEAD
   
 
  return (
    <Container py={"16"} h="90vh">
     <form onSubmit={submitHandler}>
=======
 
  return (
    <Container py={"16"} h="90vh">
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
      <Heading
        children="Forget Password"
        textTransform={'uppercase'}
        textAlign={['center', 'left']}
        my="16"
      
      />
      <VStack spacing={"8"}>
<<<<<<< HEAD

=======
 <form onSubmit={submitHandler}>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
 <Input
            required
            type={'email'}
            focusBorderColor="yellow.500"
           
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
          />
<<<<<<< HEAD
          <Button isLoading={loading} width={"full"} type="submit" colorScheme="yellow" my={"8"}>Send Reset Link</Button>
          </VStack>
 </form>
      
=======
          <Button isLoading={loading} width={"full"} colorScheme="yellow" my={"8"}>Send Reset Link</Button>
 </form>
      </VStack>
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
    </Container>
  );
}

export default ForgetPassword;
