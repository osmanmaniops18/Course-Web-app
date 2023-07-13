import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import { useLayoutEffect } from 'react';


function Login({isAutenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const dispatch=useDispatch();
  
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(login(email,password))


  }

  useLayoutEffect(()=>{
    if(isAutenticated){
      navigate('/profile')

    }
  },[navigate,isAutenticated])
  
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent="center" spacing={"16"}>
        <Heading children="Welcome To Learner" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              type={'email'}
              focusBorderColor="yellow.500"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              type={'password'}
              focusBorderColor="yellow.500"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </Box>

          <Box>
            <Link to="/forgetpassword">
              <Button variant={'link'} size="sm">
                Forget Password?
              </Button>
            </Link>
          </Box>
          <Button my={'4'} type="submit" colorScheme={'yellow'}>
            Login
          </Button>
          <Box my={"4"}>
            New User? {' '}
            <Link to={'/register'}>
              {' '}
              <Button variant={'link'} colorScheme="yellow">
                Sign Up
              </Button>{" "}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Login;
