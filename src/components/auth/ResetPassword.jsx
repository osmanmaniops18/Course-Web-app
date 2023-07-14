import { Container, Heading, VStack,Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom"
import { resetPassword } from '../../redux/actions/profile';

function ResetPassword() {
    const [password, setPassword] = useState("")
    const params=useParams();

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
      <Heading
        children="Reset Password"
        textTransform={'uppercase'}
        textAlign={['center', 'left']}
        my="16"
      
      />
      <VStack spacing={"8"}>
 <Input
            required
            type={'password'}
            focusBorderColor="yellow.500"
        
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter New Password"
          />
          <Button type='submit' isLoading={loading} width={"full"} colorScheme="yellow" my={"8"}>Reset Password</Button>
          </VStack>
          </form>
      
    </Container>
  );
}

export default ResetPassword