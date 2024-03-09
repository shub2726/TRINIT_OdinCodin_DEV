import React, { useState } from "react";
import axios from "axios";
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

import { Flex, Box, Container } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useToast, Heading } from '@chakra-ui/react'

import Cookies from "universal-cookie";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast()
    const cookies = new Cookies();

    const verifier = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || password === "") {
            toast({
                title: 'Please do not leave empty fields.',
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
            return false;
        } else if (!emailRegex.test(email)) {
            toast({
                title: 'Please enter a correct email.',
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!verifier(email, password)) {
                return;
            }

            const response = await axios.post("http://localhost:8000/user/login", {
                email: email,
                password: password,
            }, { withCredentials: true });

            console.log(response.data.user)
            cookies.set("TOKEN", response.data.user, {
                path: "/",
            });

            window.location.href = "/app/dashboard"
            // redirect url: window.location.href = "/clubAdmin";
        } catch (error) {
            // Handle error
            toast({
                title: error.response.data.message,
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    };

    return (
        <Flex
            height="100vh"
            align="center"
            justify="center"
        >
            <Container direction="column" align="center" justify="center">
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p="6"
                    boxShadow="lg"
                >
                    <Heading>TestSeva</Heading>
                    <FormControl>
                        <Flex direction="column" align="center" justify="center" height="50vh">
                            <Box mb={4}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type='email'
                                    placeholder="Enter your email"
                                    size="md"
                                    variant='filled'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box mb={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder="Enter your password"
                                    size="md"
                                    variant='filled'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>
                            <Button
                                colorScheme='blue'
                                onClick={handleSubmit}
                                size="lg"
                                width="50%"
                            >
                                Login
                            </Button>
                        </Flex>
                    </FormControl>
                </Box>
            </Container>
        </Flex>
    );
}
