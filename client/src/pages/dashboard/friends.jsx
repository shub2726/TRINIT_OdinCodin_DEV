import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  Container,
  Flex,
  Heading,
  Divider,
  VStack,
  Icon,
  Input,
  Tooltip,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  Stack,
  Button,
  ButtonGroup,
  WrapItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  useToast,
} from "@chakra-ui/react";

import { BiSolidHourglass } from "react-icons/bi";

import { IoMdCheckmark } from "react-icons/io";

import { AddIcon, SpinnerIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function Friends() {
  const toast = useToast();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/getUsers?search=${searchInput}&userID=${token.user._id}`
      );

      // Sort users based on whether the current user's ID is in their sentRequests
      const sortedUsers = response.data.sort((a, b) => {
        const aSentRequest = a.sentRequests.includes(token.user._id);
        const bSentRequest = b.sentRequests.includes(token.user._id);

        // Sort by whether the current user's ID is in sentRequests (true comes first)
        return bSentRequest - aSentRequest;
      });

      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchInput]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/getFriends?userID=${token.user._id}`
      );
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleAddFriend = async (userId) => {
    try {
      const senderId = token.user._id;
      await axios.post(
        `http://localhost:8000/api/v1/users/sendFriendRequest/${userId}`,
        { senderId }
      );
      toast({
        title: "Sent Friend Request",
        status: "success",
        position: "bottom-right",
      });

      // Refetch the list of users after the friend request is sent
      fetchUsers();
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast({
        title: "Error Sending Friend Request",
        status: "error",
        position: "bottom-right",
      });
    }
  };

  const handleAcceptFriendRequest = async (userId) => {
    try {
      const senderId = token.user._id;
      await axios.post(
        `http://localhost:8000/api/v1/users/acceptFriendRequest/${userId}`,
        { senderId }
      );
      toast({
        title: "Friend Request Accepted",
        status: "success",
        position: "bottom-right",
      });

      // Refetch the list of users after accepting the friend request
      fetchUsers();
      fetchFriends();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast({
        title: "Error Accepting Friend Request",
        status: "error",
        position: "bottom-right",
      });
    }
  };

  const handleDeclineFriendRequest = async (userId) => {
    try {
      const senderId = token.user._id;
      await axios.post(
        `http://localhost:8000/api/v1/users/declineFriendRequest/${userId}`,
        { senderId }
      );
      toast({
        title: "Friend Request Declined",
        status: "info",
        position: "bottom-right",
      });

      // Refetch the list of users after declining the friend request
      fetchUsers();
    } catch (error) {
      console.error("Error declining friend request:", error);
      toast({
        title: "Error Declining Friend Request",
        status: "error",
        position: "bottom-right",
      });
    }
  };

  return (
    <Flex
      flex={1}
      direction="row"
      justifyContent="space-between"
      height="100%"
      padding={5}
      gap={10}
    >
      <Flex direction="row" flex={1} gap={10} flexWrap="wrap">
        {friends.map((index) => (
          <WrapItem key={index}>
            <Card maxW="sm" p="20px" border="1px" borderColor="gray.300">
              <CardBody>
                <Stack spacing={10} alignItems="center">
                  <Avatar src="https://bit.ly/broken-link" />
                  <Text>{index.firstName}</Text>
                </Stack>
              </CardBody>
            </Card>
          </WrapItem>
        ))}
      </Flex>
      {/* <Divider alignSelf="stretch" orientation="vertical" /> */}
      <Flex
        justifySelf="flex-end"
        direction="column"
        gap="15px"
        backgroundColor="rgba(255,255,255,0.8)"
        padding="20px"
        borderRadius="12px"
        boxShadow="lg"
      >
        <Heading size="lg">Add Friends</Heading>
        <InputGroup backgroundColor="white">
          <InputLeftElement pointerEvents="none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </InputLeftElement>
          <Input
            placeholder="Search by Name/Username"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </InputGroup>
        <Stack spacing="4">
          {users.map((user) => (
            <Card key={user._id} size="sm">
              <CardHeader mb="-20px">
                <Heading size="md">
                  {user.firstName} {user.lastName}
                </Heading>
                <Text>u/{user.username}</Text>
              </CardHeader>
              <CardBody>
                <Flex
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Text>{user.testCount} tests given until now</Text>
                  {user.pendingRequests.includes(token.user._id) ? (
                    <Tooltip label="Request Pending" fontSize="md">
                      <span>
                        <Icon as={BiSolidHourglass} boxSize={7} />
                      </span>
                    </Tooltip>
                  ) : user.sentRequests.includes(token.user._id) ? (
                    <Flex direction="row" alignItems="center" gap="1.7em">
                      <Tooltip label="Accept Request" fontSize="md">
                        <VStack>
                          <Icon
                            cursor="pointer"
                            as={IoMdCheckmark}
                            boxSize={8}
                            onClick={() => handleAcceptFriendRequest(user._id)}
                          />
                        </VStack>
                      </Tooltip>
                      <Tooltip label="Decline Request" fontSize="md">
                        <CloseIcon
                          cursor="pointer"
                          boxSize={5}
                          onClick={() => handleDeclineFriendRequest(user._id)}
                        />
                      </Tooltip>
                    </Flex>
                  ) : (
                    <Tooltip label="Send Request" fontSize="md">
                      <AddIcon
                        cursor="pointer"
                        boxSize={6}
                        onClick={() => handleAddFriend(user._id)}
                      />
                    </Tooltip>
                  )}
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Flex>
    </Flex>
  );
}
