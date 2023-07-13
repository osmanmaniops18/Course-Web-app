import {
    Avatar,
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
  import { Link ,useNavigate} from 'react-router-dom';
import { register } from '../../redux/actions/user';
  
  export const fileUploadCss={
    cursor:"pointer",
    marginLeft:"-5%",
    marginTop:"5px",
    width:"110%",
    border:"none",
    color:"#ECC94B",
    backgroundColor:"white"

  }
  const fileUploadStyle={
    "&::file-selector-button":fileUploadCss
  }

function Register({isAutenticated}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imagePrev,setImagePrev]=useState("")
    const [image,setImage]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const changeFileHandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagePrev(reader.result);
            setImage(file);
        }



    }
   const submitHandler=(e)=>{
    e.preventDefault();
     const myForm=new FormData();
     myForm.append('name',name)
     myForm.append('email',email)
     myForm.append('password',password)
     myForm.append('file',image)
     dispatch(register(myForm))
   }
    
  useLayoutEffect(()=>{
    if(isAutenticated){
      navigate('/profile')

    }
  },[navigate,isAutenticated])
  return (
    <Container h={'125vh'}>
    <VStack h={'full'} justifyContent="center">
      <Heading textTransform={"uppercase"} children="Registertion" />
      <form onSubmit={submitHandler} style={{ width: '100%' }}>
      <Box my={"4"} display="flex" justifyContent={"center"}>
        <Avatar src={imagePrev} size="2xl"/>
      </Box>
      <Box my={'4'}>
          <FormLabel htmlFor="name" children="Name" />
          <Input
            required
            type={'text'}
            focusBorderColor="yellow.500"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="abc"
          />
        </Box>
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
        <Box my={'4'}>
          <FormLabel htmlFor="avatar" children="Choose Avatar" />
          <Input
            required
            accept='imgae/*'
            type={'file'}
            focusBorderColor="yellow.500"
            id="avatar"
            css={fileUploadStyle}
            onChange={changeFileHandler}
        
          />
        </Box>

      
        <Button my={'4'} type="submit" colorScheme={'yellow'}>
          Sign Up
        </Button>
        <Box my={"4"}>
          Already Have an Account? {' '}
          <Link to={'/login'}>
            {' '}
            <Button variant={'link'} colorScheme="yellow">
             Login
            </Button>{" "}
            here
          </Link>
        </Box>
      </form>
    </VStack>
  </Container>
  )
}

export default Register