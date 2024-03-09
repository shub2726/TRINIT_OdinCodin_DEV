import { useState,useEffect } from "react";
import { chakra, Box, Wrap, WrapItem, Grid, GridItem, Radio, RadioGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, Button, ButtonGroup,Flex,Spacer,Avatar } from "@chakra-ui/react";
// import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function TestInterface() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const [value, setValue] = useState('1');

    const trapeziumStyles = {
        clipPath: "polygon(20% 0%, 90% 20%, 90% 80%, 20% 100%)",
    };


    const [seconds, setSeconds] = useState(10);
    const [minutes, setMinutes] = useState(1);
    const [hours, setHours] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timerInterval = setInterval(() => {
          if (seconds > 0 || minutes > 0 || hours > 0) {
            setSeconds((prevSeconds) => (prevSeconds === 0 ? 59 : prevSeconds - 1));
    
            if (seconds === 0 && minutes > 0) {
              setMinutes((prevMinutes) => prevMinutes - 1);
            }
    
            if (seconds === 0 && minutes === 0 && hours > 0) {
              setHours((prevHours) => prevHours - 1);
            }
          } else {
            clearInterval(timerInterval); // Stop the timer when it reaches zero
            handleTimerEnd();
          }
        }, 1000);
    
        return () => clearInterval(timerInterval);
      }, [seconds, minutes, hours]);

      const handleTimerEnd = () =>{
        setIsModalOpen(true);
      }

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

  return (
    <>
    <Flex as="nav" p="2px" alignItems='center' gap='10px' bgColor='gray.200' justifyContent='center'>
        <Heading as="h1" p="10px">TestSeva</Heading>
        <Spacer />
        <Flex>
            <Card bg='black' color='white'>
            <CardBody >
                <Text>{hours.toString().padStart(2, "0")}</Text>
            </CardBody>
            </Card>
            <Text mx={2} fontWeight='bold' fontSize='2xl' alignSelf='center'>:</Text> {/* Add a colon between the cards */}
            <Card bg='black' color='white'>
            <CardBody>
                <Text>{minutes.toString().padStart(2, "0")}</Text>
            </CardBody>
            </Card>
            <Text mx={2} fontWeight='bold' fontSize='2xl' alignSelf='center'>:</Text> {/* Add a colon between the cards */}
            <Card bg='black' color='white'>
            <CardBody>
                <Text>{seconds.toString().padStart(2, "0")}</Text>
            </CardBody>
            </Card>
        </Flex>
        <Spacer />
        {/* <Text fontSize='2xl'>{token.user.username}</Text> */}
        <Avatar bg='teal.500'/>
        <Stack spacing={0.5} p="3px">
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
    <Flex bgColor='orange' p='15px' alignItems='center' >
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
                <Box width="85%" maxHeight="350px" overflowY="scroll"
                css={{
                    '::-webkit-scrollbar': {
                      width: '5px', // Adjust the width as needed
                    },
                    '::-webkit-scrollbar-thumb': {
                      backgroundColor: 'gray',
                      borderRadius: '10px', // Adjust the border radius as needed
                    },
                    '::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                    <Text fontSize='xl' p='25px' fontWeight='500'>question: Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis est provident, facilis dignissimos mollitia vitae, perferendis suscipit optio voluptatem hic quasi beatae adipisci, voluptas id officiis reprehenderit laborum sunt aut libero vero molestias. Maxime ipsa suscipit accusantium eius doloribus. Reprehenderit quas facere odio saepe similique dolorum voluptate ipsa fugit. Libero voluptatem hic debitis culpa, a quam ut ipsum blanditiis minima ducimus nisi accusamus vel asperiores omnis, quia repellendus ipsam?</Text>
                    <RadioGroup p="15px" onChange={setValue} value={value}>
                    <Stack direction='column'>
                        <Radio size="lg" value='1'><Text fontSize="20px">First</Text></Radio>
                        <Radio size="lg" value='2'><Text fontSize="20px">Second</Text></Radio>
                        <Radio size="lg" value='3'><Text fontSize="20px">Third</Text></Radio>
                        <Radio size="lg" value='4'><Text fontSize="20px">Fourth</Text></Radio>

                    </Stack>
                    </RadioGroup>
                </Box>
                <Divider borderWidth="1px" borderColor="black"/>
                <Flex p="10px" gap="15px">
                    <Button borderRadius="0px" colorScheme='green'>SAVE & NEXT</Button>
                    <Button borderRadius="0px" colorScheme='orange'>SAVE & MARK FOR REVIEW</Button>
                    <Button borderRadius="0px" colorScheme='white' color="black" borderColor="black" borderWidth="1px">CLEAR RESPONSE</Button>
                    <Button borderRadius="0px" colorScheme='blue'>MARK FOR REVIEW AND NEXT</Button>
                </Flex>

                <Flex bgColor="gray.300" gap="2px" height="60px" alignItems="center" p="15px">
                <Button size="md" borderRadius="0px" colorScheme='white' color="black" borderWidth="1px" borderColor="black"><ArrowLeftIcon p="2px"/>PREV</Button>
                <Button size="md" borderRadius="0px" colorScheme='white' color="black" borderWidth="1px" borderColor="black">NEXT<ArrowRightIcon p="2px" /></Button>

                <Spacer />
                <Button size="md" borderRadius="0px" colorScheme='green'>SUBMIT</Button>

                </Flex>
            </Box>
        </GridItem>
        <GridItem colSpan={1}>
            <Flex p="10px" gap="40px">
                <Flex alignItems="center" width="140px" gap="10px">
                    <Button size="md">89</Button>
                    <Text fontWeight="bold">Not Visited</Text>
                </Flex>
                <Flex alignItems="center" gap="10px">
                <Button style={trapeziumStyles} borderRadius="0" size="md" colorScheme="red">
                    1
                </Button>
                <Text fontWeight="bold">Not Answered</Text>
                </Flex>
            </Flex>
            <Flex p="10px" gap="40px">
                <Flex alignItems="center" width="140px" gap="10px">
                <Button style={trapeziumStyles} borderRadius="0" size="md" colorScheme="green">
                    0
                </Button>
                <Text fontWeight="bold">Answered</Text>
                </Flex>
                <Flex alignItems="center" gap="10px">
                    <Button borderRadius="full" size="md" colorScheme="purple">0</Button>
                    <Text fontWeight="bold">Marked For Review</Text>
                </Flex>
            </Flex>
            <Flex p="10px" alignItems="center" gap="10px">
                <Button borderRadius="full" size="md" colorScheme="purple" position="relative">
                <Box
                position="absolute"
                bottom="-0.7"
                right="-0.5"
                width="20px"
                height="20px"
                borderRadius="full"
                backgroundColor="green.400"
                />
                    0
                </Button>
                
                <Text fontWeight="bold">Answered & Marked For Review (will be considered for evaluation)</Text>
            </Flex>




                <Flex flexWrap="wrap" gap="12px" p="20px">
                    <Button size="md" bgColor="gray.300">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>
                    <Button size="md">1</Button>

                    
                </Flex>
        </GridItem>
    </Grid>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl" isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">Time's Up!</ModalHeader>
          <ModalBody>
            <Text fontSize="xl">
              Your time has run out. You will be redirected to the dashboard shortly.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
