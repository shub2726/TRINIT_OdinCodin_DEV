import { useState } from "react";
import { chakra, Box, Wrap, WrapItem, Grid, GridItem, Radio, RadioGroup } from "@chakra-ui/react";
import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, Button, ButtonGroup,Flex,Spacer,Avatar } from "@chakra-ui/react";
// import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function TestInterface() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const [value, setValue] = useState('1')

  return (
    <>
    <Flex as="nav" p="2px" alignItems='center' gap='10px' bgColor='gray.200' justifyContent='center'>
        <Heading as="h1" p="10px">TestSeva</Heading>
        <Spacer />
        <Flex>
            <Card bg='black' color='white'>
            <CardBody >
                <Text>20</Text>
            </CardBody>
            </Card>
            <Text mx={2} fontWeight='bold' fontSize='2xl' alignSelf='center'>:</Text> {/* Add a colon between the cards */}
            <Card bg='black' color='white'>
            <CardBody>
                <Text>20</Text>
            </CardBody>
            </Card>
            <Text mx={2} fontWeight='bold' fontSize='2xl' alignSelf='center'>:</Text> {/* Add a colon between the cards */}
            <Card bg='black' color='white'>
            <CardBody>
                <Text>20</Text>
            </CardBody>
            </Card>
        </Flex>
        <Spacer />
        {/* <Text fontSize='2xl'>{token.user.username}</Text> */}
        <Avatar bg='teal.500'/>
        <Stack spacing={0.5}>
            <Text>
                Candidate Name : {token.user.firstName} {token.user.lastName}
            </Text>
            <Text>
                Test Name : {/* we will take the name of the test after fetching the QP*/}
            </Text>
            <Text>
                Total Time : x minutes
            </Text>
        </Stack>
    </ Flex>
    <Flex bgColor='orange' p='20px' alignItems='center' >
        <Text fontSize='30px' >JEE MAIN</Text>
        <Spacer />
        <Button colorScheme='blue' size='lg'>
            PHYSICS
        </Button>
        <Button colorScheme='blue' size='lg'>
            CHEMISTRY
        </Button>
        <Button colorScheme='blue' size='lg'>
            MATHEMATICS
        </Button>
    </Flex>
    <Grid templateColumns="70% 30%" gap={4}>
        <GridItem colSpan={1}>
            <Box height='100%' p="20px" display='flex' flexDirection="column" >
                <Text fontWeight='bold' fontSize="2xl">Question y</Text>
                <Divider borderWidth="1px" borderColor="black"/>
                <Box width="80%" >
                    <Text fontSize='xl' p='25px' fontWeight='500'>question: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quaerat minima modi nulla omnis, officiis explicabo ab! Voluptas expedita rem distinctio autem in ut sequi quia adipisci voluptatum fugit quaerat doloribus, maiores, earum assumenda odit suscipit dolor eius cumque porro?</Text>
                    <RadioGroup p="25px" onChange={setValue} value={value} spacing>
                    <Stack direction='column'>
                        <Radio size="lg" value='1'><Text fontSize="20px">First</Text></Radio>
                        <Radio size="lg" value='2'><Text fontSize="20px">Second</Text></Radio>
                        <Radio size="lg" value='3'><Text fontSize="20px">Third</Text></Radio>
                        <Radio size="lg" value='3'><Text fontSize="20px">Fourth</Text></Radio>

                    </Stack>
                    </RadioGroup>
                </Box>
            </Box>
        </GridItem>
        <GridItem colSpan={1}>
            <Text>All Questions</Text>
        </GridItem>
    </Grid>
    </>
  )
}
