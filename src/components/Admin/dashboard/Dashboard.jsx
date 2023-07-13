import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['fit-content', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
   
  >
    <Text  children={title} />

    <HStack spacing={'6'}>
      <Text  fontSize={'2xl'} fontWeight="bold" children={qty} />
      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children="Since Last Month" />
  </Box>
);

const Bar=({title,value,profit})=>(

  <Box py={"4"} px={["0","20"]}>
  <Heading size={"sm"} children={title} mb="2" />
  <HStack alignItems={"center"} w="full">
    <Text children={profit ? "0%": `${-value}%`}/>
    <Progress w="full" value={profit ? value:0}  colorScheme="purple" />

    <Text children={`${value>100?value:100}%`}/>
  </HStack>

  </Box>

)
const Dashboard = () => {
  const lastVisit = String(new Date()).split('G')[0];
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      <Box boxSize={'border-box'} opacity={0.5} py="10" px={['4', '0']}>
        <Text textAlign={'center'} children={`Last Change Was ${lastVisit} `} />
        <Heading
          children="Dashboard"
          ml={['0', '16']}
          mb="16"
          textAlign={['center', 'left']}
        />
        <Stack
          direction={['column', 'row']}
          minH="24"
          justifyContent={'space-evenly'}
        >
          <Databox title="Views" qty="123" qtyPercentage="30" profit={true} />
          <Databox title="Users" qty="300" qtyPercentage="30" profit={true} />
          <Databox
            title="Subscrption"
            qty="13"
            qtyPercentage="10"
            profit={false}
          />
        </Stack>
        <Box
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          m={['0', '16']}
          borderRadius="lg"
          p={['0', '16']}
          mt={['4', '16']}
        >
          <Heading children="Views Graph"  textAlign={["center","left"]} size="md" pt={["8","0"]} ml={["0","16"]} />

     <LineChart />
        </Box>
        <Grid templateColumns={["1fr","2fr 1fr"]}>
          <Box p={"4"}>
            <Heading textAlign={["center","left"]} size="md" children="Prograss Bar" my={"8"} ml={["0","16"]} />
            <box>
              <Bar profit={true} title="Views" value={20} />
              <Bar profit={true} title="Users" value={78} />
              <Bar profit={false} title="Subscribtion" value={20} />
            </box>
          </Box>
          <Box p={["0","16"]} boxSizing="border-box" py={"4"}>
            <Heading children="Users" textAlign={"center"} size="md" mb={"4"} />
            <DoughnutChart />
          </Box>
        </Grid>
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
