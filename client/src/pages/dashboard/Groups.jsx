import { Button, Text } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import { Input,Flex } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import Cookies from "universal-cookie";
import { Box } from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Groups = () => {
    const cookies = new Cookies();
    
    const token = cookies.get("TOKEN")
    const toast = useToast()
    const [grpID,setID] = useState("")
    const [grpName,setGrpName] = useState("");
    const [groups,setGroups] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const newGRP = async (e) => {
        try{
            const response = axios.post('http://localhost:8000/api/v1/groups/new-group',{
                "userID":token.user._id,
                "GroupName":grpName
            })

            toast({
                title: 'Group created.',
                // description: "We've created your account for you.",
                position:'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

            setGrpName("");
            setTimeout(onClose,1000)

            
        } catch(error){
            toast({
                title: error.response.data.message,
                position: 'top-left',
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    }

    const joinGRP = async (e) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/groups/join-group",{
                "grpID":grpID,
                "userID":token.user._id
            })

            toast({
                title: 'Group joined.',
                // description: "We've created your account for you.",
                position:'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

            setID("");
            
            
            console.log(response);
        } catch(error){
            console.log(error);
            toast({
                title: error.response.data.message,
                // description: "We've created your account for you.",
                position:'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
        }
    }

    const fetchGRPs = async() => {
        const response = await axios.post("http://localhost:8000/api/v1/groups/get-groups",{"userID":token.user._id})
        setGroups(response.data)
    }

    useEffect(() => {
      fetchGRPs();
    }, [])

    useEffect(() => {
    //   console.log(groups);
    //   groups.forEach(e => {
    //     console.log(e.GroupName);
    //   })
    }, [groups])
    
    
  return (
    <>
        <Flex direction="column" gap="10px" p="20px"> 
            <Button onClick={onOpen}>New Group</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                `   <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input value={grpName} onChange={(e) => {setGrpName(e.target.value)}} placeholder='Group Name'></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={newGRP}>Create</Button>
                    </ModalFooter>`
                </ModalContent>
            </Modal>


            <Flex gap="10px">
                <Input placeholder='Input Unique ID' value={grpID} onChange={(e) => {setID(e.target.value)}}/>
                <Button onClick={joinGRP} p="15px" w="200px">Join Group</Button>
            </Flex>
            <Text  fontSize="6xl">Groups</Text>
            <Flex direction="column" gap="10px">
                {groups.map((e, index) => (
                    <Link to={`${e._id}`}>
                        <Button key={index} p="10px" w="200px">
                            <Text>{e.GroupName}</Text>
                        </Button>
                    </Link>
                ))}
            </Flex>
        </Flex>
    </>
  )
}

export default Groups