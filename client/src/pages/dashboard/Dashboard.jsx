import { chakra, Box, Wrap, WrapItem } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const cookies = new Cookies();
  const [userPapers, setUserPapers] = useState([])
  const [allPapers, setAllPapers] = useState([])
  const token = cookies.get("TOKEN");

  const fetchUserPapers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/papers/getPapers/' + token.user._id);
        setUserPapers(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const fetchPapers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/papers/getAllPapers/');
        setAllPapers(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchPapers();
    fetchUserPapers();
  }, [])

  return (
    <>
    <Box p="4" flex={1}>
      <Tabs>
        <TabList>
          <Tab>All available Tests</Tab>
          <Tab>Your Tests</Tab>
        </TabList>
          <TabPanels>
            <TabPanel>
              <Wrap spacing="15px" justify="center" mt="15px">
                {allPapers.map((paper, index) => (
                  <WrapItem key={index}>
                    <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
                      <CardBody>
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{paper.paperTitle}</Heading>
                          <Text color="blue.600" fontSize="2xl">
                            {token.user.username}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button variant="solid" colorScheme="green">
                            Attempt Now
                          </Button>
                          <Button variant="solid" colorScheme="gray" color="gray">
                            Analytics
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  </WrapItem>
                ))}
              </Wrap>
            </TabPanel>
            <TabPanel>
              <Wrap spacing="15px" justify="center" mt="15px">
                {userPapers.map((paper, index) => (
                  <WrapItem key={index}>
                    <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
                      <CardBody>
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{paper.paperTitle}</Heading>
                          <Text color="blue.600" fontSize="2xl">
                            You
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button variant="solid" colorScheme="green">
                            Attempt Now
                          </Button>
                          <Button variant="solid" colorScheme="gray" color="gray">
                            Analytics
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  </WrapItem>
                ))}
              </Wrap>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
