import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logOutUser} from "../../../redux/actions/user.js"

const LinkButton=({url="/", title="Home",onClose})=>(
<Link onClick={onClose} to={url}>
  <Button variant={"ghost"}>{title}</Button>
</Link>
)
function Header({isAutenticated,user}) {
  const {isOpen,onOpen,onClose}=useDisclosure();
  const dispatch=useDispatch()


  const logoutHandler=()=>{
  
    onClose();
    dispatch(logOutUser())
  }
  return (
    <>
      <ColorModeSwitcher />

      <Button
      onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={"overlay"}
        position={'fixed'}
        top="6"
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement='left' isOpen={isOpen} onClose={onClose}>

<DrawerOverlay backdropFilter={"blur(3px)"}/>
<DrawerContent>
  <DrawerHeader borderBottomWidth={"1px"}>COURSE BUNDLER</DrawerHeader>
  <DrawerBody>
    <VStack spacing={"4"} alignItems="flex-start">
   <LinkButton onClose={onClose} url='/' title='Home'/>
   <LinkButton onClose={onClose} url='/courses' title='Browse All Courses'/>
   <LinkButton onClose={onClose} url='/request' title='Request a Course'/>
   <LinkButton onClose={onClose} url='/contact' title='Contact Us'/>
   <LinkButton onClose={onClose} url='/about' title='About Us'/>
   <HStack justifyContent={"space-evenly"} position="absolute" bottom={"4rem"} width="80%">
  {isAutenticated ? (<>
    <VStack>
      <HStack>
      <Link onClick={onClose} to="/profile">
    <Button  variant={"ghost"} colorScheme={"yellow"}>Profile</Button>
    <Button variant={"ghost"} onClick={logoutHandler} >
    <RiLogoutBoxLine/>
    LogOut</Button>

   </Link>
      </HStack>
      {user && user.role==="admin" && (<Link onClick={onClose} to="/admin/dashboard">
    <Button colorScheme={"purple"} variant="ghost">
      <RiDashboardFill style={{margin:"4px"}} />
      DashBoard
    </Button>
   </Link>)   }
    </VStack>
  </>):(<>
    <Link onClick={onClose} to="/login">
    <Button colorScheme={"yellow"}>Login</Button>
   </Link>

   <p>OR</p>


   <Link onClick={onClose} to="/register">
    <Button colorScheme={"yellow"}>Sign Up</Button>
   </Link>
  </>)}

   </HStack>
  
    </VStack>

  </DrawerBody>
</DrawerContent>
      </Drawer>
    </>
  );
}

export default Header;
