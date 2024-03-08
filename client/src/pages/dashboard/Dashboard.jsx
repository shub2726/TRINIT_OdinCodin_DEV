import { chakra, Box, Wrap, WrapItem } from "@chakra-ui/react";
import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, Button, ButtonGroup } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function Dashboard() {
  const cookies = new Cookies();

  const token = cookies.get("TOKEN");
  return (
    <>
      <Box width="80%" p="4">
        <Tabs>
          <TabList>
            <Tab>All available Tests</Tab>
            <Tab>Your Tests</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Wrap spacing="15px" justify="center" mt="15px">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <WrapItem key={index}>
                    <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
                      <CardBody>
                        <Stack mt="6" spacing="3">
                          <Heading size="md">JEE Mock Test - {index}</Heading>
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
                {[1, 2, 3, 4].map((index) => (
                  <WrapItem key={index}>
                    <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
                      <CardBody>
                        <Stack mt="6" spacing="3">
                          <Heading size="md">JEE Mock Test - {index}</Heading>
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