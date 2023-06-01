import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import intro from '../../assets/videos/intro.mp4';

const CoursePages = () => {
    const [lectureNumber,setLectureNumber]=useState(0);;
    const lecture=[
        {
        _id:"dasjhdjh",
        title:"sample title",
        descrption:"hsaJHAdjka jaaJDGAHD",
        video:{
            url:"ghahsgdas"
        }
        
    },
    {
        _id:"ssada",
        title:"sample 2 title",
        descrption:"hsaJHAdjka jaaJDGAHD",
        video:{
            url:"ghahsgdas"
        }
        
    },
    {
        _id:"dsda",
        title:"sample 3 title",
        descrption:"hsaJHAdjka jaaJDGAHD",
        video:{
            url:"ghahsgdas"
        }
        
    },
]
  return (
    <Grid minH={"90vh"} templateColumns={["1fr","3fr 1fr"]}>

    <Box>
    <video
    width={"100%"}
            controls
            src={intro}
            controlsList="nodownload  noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
          ></video>
          
       <Heading m="4" children={`#${lectureNumber+1} ${lecture[lectureNumber].title}`}/>
       <Heading m="4" children="Descrption"/>
       <Text  m="4" children={`${lecture[lectureNumber].descrption}`} />
    </Box>
    <VStack>
       { lecture.map((element,index)=>(
        <button key={element._id}
        onClick={()=>setLectureNumber(index)}
        style={{
            width:"100%",
            padding:"1rem",
            textAlign:"center",
            borderBottom:"1px solid rgba(0,0,0,0.2)",
            margin:"0"


        }}
        >
        <Text noOfLines={1}>
            #{index+1} {element.title}
        </Text>

        </button>
       ))}
    </VStack>

    </Grid>
  )
}

export default CoursePages