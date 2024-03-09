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
import { Tabs, TabList, TabPanels, Tab, TabPanel,useToast } from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const cookies = new Cookies();
  const [userPapers, setUserPapers] = useState([])
  const [allPapers, setAllPapers] = useState([])
  const token = cookies.get("TOKEN");
  const toast = useToast();

  const navigate = useNavigate();

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

  const checkifMember = async (grpID) => {
    try{
      // console.log(grpID);
      if (grpID == undefined) return false;
      const value = await axios.post('http://localhost:8000/api/v1/groups/check-members',{"GroupID":grpID,"userID":token.user._id});
      if (value.data){
        navigate(`/app/tests/${grpID}`)
      }
      else{
        toast({
          title: "Paper not attempted. Cannot discuss",
          position: 'top-left',
          status: 'error',
          duration: 1000,
          isClosable: true,
      })
      }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
  }

  const redir1 = (grpID) =>{

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
                            {paper.userId.username}
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
                            <Button variant="solid" colorScheme="gray" color="gray" onClick={() => checkifMember(paper.GroupID)}>
                              Discuss
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
                          <Button variant="solid" colorScheme="gray" color="gray" onClick={() => checkifMember(paper.GroupID)}>
                            Discuss
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
