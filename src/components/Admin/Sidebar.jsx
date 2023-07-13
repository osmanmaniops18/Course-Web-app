import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location=useLocation();
  return (
    <VStack spacing={"8"} p="16" boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
    <Linkbutton url="dashboard" name="Dashboard" Icon={RiDashboardFill} active={location.pathname==="/admin/dashboard"} />
    <Linkbutton url="users" name="Users" Icon={RiUser3Fill} active={location.pathname==="/admin/users"} />
    <Linkbutton url="courses" name="Course" Icon={RiEyeFill} active={location.pathname==="/admin/courses"} />
    <Linkbutton url="createcourse" name="Create Course" Icon={RiAddCircleFill} active={location.pathname==="/admin/createcourse"} />
    </VStack>
  )
}

export default Sidebar

function Linkbutton({url,name,Icon,active}){
   return (
        <Link to={`/admin/${url}`}>
        <Button fontSize={"larger"} variant="ghost" colorScheme={active ? "purple" : ""}>
            <Icon style={{margin:"4px"}}/>
          {name}
        </Button>
    </Link>
    )
}