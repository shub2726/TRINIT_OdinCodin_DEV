import React from "react";
import { Container, Flex, Input, InputGroup, InputLeftAddon, Box, Text, Stack, Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, WrapItem } from '@chakra-ui/react'
export default function Friends() {
    return (
        <Flex alignItems="flex-start" width="70%" padding={5} direction="column" gap={10}>
            <InputGroup>
                <InputLeftAddon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>            </InputLeftAddon>
                <Input type='email' placeholder='Search by email...' />
                <Button variant="solid" colorScheme="green">
                    Add friend
                </Button>
            </InputGroup>
            <Flex gap={10} flexWrap="wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                    <WrapItem key={index}>
                        <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
                            <CardBody>
                                <Stack spacing={10} alignItems="center">
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Text>Shubham Pahilwani</Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    </WrapItem>
                ))}
            </Flex>
        </Flex>
    );
}