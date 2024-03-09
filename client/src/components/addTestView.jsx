import React, { useRef, useState, useEffect } from "react";
import { Container, Flex, Input, InputGroup, InputLeftAddon, Box, Text, Stack, Button, ButtonGroup, Select } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, WrapItem } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import axios from "axios";
import QuestionParser from "./QuestionParser";
import Cards from "./Cards";
import Cookies from "universal-cookie";
import { useToast, Heading } from '@chakra-ui/react'

const AddTestView = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [time, setTime] = useState("");
    const [visibility, setVisibility] = useState("1");

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [questions, setQuestions] = useState([])
    const [concatdata, setConcatData] = useState("");

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const toast = useToast()
    // https://ncert.nic.in/pdf/publication/exemplarproblem/classIX/science/ieep117.pdf

    
    const generate = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/papers/create-paper", {
                userId: token.user._id,
                paperTitle: title,
                timelimit: time,
                Private: visibility,
                questions: questions
            }, { withCredentials: true });

            console.log(response.data.user)

            toast({
                title: "Paper has been generated!",
                position: 'top-left',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })

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

    const fetchData = async () => {
        let data = new FormData();
        data.append('url', link);
        data.append('language', 'eng');
        data.append('scale', 'true');
        data.append('isOverlayRequired', 'false');
        data.append('iscreatesearchablepdf', 'false');
        data.append('issearchablepdfhidetextlayer', 'false');
        data.append('filetype', 'pdf');
        data.append('detectOrientation', 'false');
        data.append('isTable', 'true');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.ocr.space/parse/image',
            headers: {
                'apikey': 'K81508780488957',
                'Content-Type': 'multipart/form-data' // Set the Content-Type manually
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            response.data.ParsedResults.forEach(element => {
                const type = element.ParsedText
                console.log(type);
                setConcatData((prev) => prev + type)
                //setConcatData(concatdata + type); 
            })
            console.log(concatdata);
            generate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Flex direction="column" gap={10} p={5}>
            <Flex gap={10}>
                <Button colorScheme='blue'
                    size="lg"
                    width="100%"
                >
                    Create a test manually
                </Button>
                <Button colorScheme='blue'
                    size="lg"
                    width="100%"
                    onClick={onOpen}
                >
                    Generate a test from a PDF
                </Button>
            </Flex>
            <div>
                <QuestionParser text={concatdata} questions={questions} setQuestions={setQuestions} />
            </div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Paper title</FormLabel>
                            <Input ref={initialRef} placeholder='Paper title' onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Paper Link</FormLabel>
                            <Input placeholder='Paper link' onChange={(e) => setLink(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Visibility</FormLabel>
                            <Select onChange={(e) => setVisibility(e.target.value)}>
                                <option value='1'>Private</option>
                                <option value='2'>Public</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Time Limit</FormLabel>
                            <Input placeholder='Time Limit in minutes' onChange={(e) => setTime(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={fetchData}>
                            Generate Test
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}

export default AddTestView;