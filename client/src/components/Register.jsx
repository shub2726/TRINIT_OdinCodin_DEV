import React, { useState } from "react";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    Container,
} from '@chakra-ui/react'

import { Flex, Spacer, Box } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    const toast = useToast()
    const [loading, setLoading] = useState(false);

    const verifier = (firstname, lastname, username, phone, email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const tenDigitPhoneNumberRegex = /^\d{10}$/;

        if (firstname === "" || lastname === "" || username === "" || phone === "" || email === "" || password === "") {
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
        } else if (!tenDigitPhoneNumberRegex.test(phone)) {
            toast({
                title: 'Please enter a correct phone.',
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
            setLoading(true)

            if (!verifier(firstname, lastname, username, phone, email)) {
                setLoading(false);
                return;
            }

            const response = await axios.post("http://localhost:8000/api/v1/auth/register", {
                firstname: firstname,
                lastname: lastname,
                username: username,
                phone: phone,
                email: email,
                password: password
            }, { withCredentials: true });
            
            setLoading(false);
            console.log(response.data.message);
        } catch (error) {
            setLoading(false);
            toast({
                title:  error.response.data.message,
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    };

    return (
        <Container>
            <Box borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="6"
                boxShadow="lg">
                <FormControl>
                    <Flex direction="column" align="center" justify="center" height="100vh">
                        <Box mb={4}>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" name='firstname' variant='filled'
                                placeholder="Enter your firstname"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </Box>
                        <Box mb={4}>
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" name='lastname' variant='filled'
                                placeholder="Enter your lastname"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Box>
                        <Box mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" name='username' variant='filled'
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box mb={4}>
                            <FormLabel>Email address</FormLabel>
                            <Input name='email' type="email" variant='filled'
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box mb={4}>
                            <FormLabel>Phone number</FormLabel>
                            <Input name='phone' type="Number" variant='filled'
                                placeholder="Enter your phone"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Box>
                        <Box mb={4}>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name="password" variant='filled'
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button colorScheme='blue'
                            size="lg"
                            isLoading = {loading}
                            loadingText='Submitting'
                            width="50%" onClick={handleSubmit}>Register
                        </Button>
                    </Flex>
                </FormControl>
            </Box>
        </Container>
    );
}