import {
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Avatar,
  Flex,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const cookies = new Cookies();

  const token = cookies.get("TOKEN");

  const handleLogout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "http://localhost:8000/logout";
  };

  return (
    <Flex
      as="nav"
      p="15px"
      alignItems="center"
      gap="10px"
      bgColor="white"
      borderWidth="1px"
    >
      {/* <Heading as="h1">TestSeva</Heading> */}
      <NavLink to="/app/dashboard">
        <Image h="75px" src="/logo.png" alt="OdinCodin Mock Test Generator" />
      </NavLink>
      <Spacer />
      <Text fontSize="2xl">{token.user.username}</Text>
      <Menu>
        <MenuButton
          as={Avatar}
          size="md"
          bg="teal.500"
          _hover={{
            cursor: "pointer",
          }}
        />
        <MenuList p="3px" boxSize="200px" justifyContent="center">
          <MenuItem color="red" onClick={handleLogout}>
            Sign Out
          </MenuItem>
          {/* Add more menu items as needed */}
        </MenuList>
      </Menu>
      {/* <Avatar bg='teal.500'/> */}
    </Flex>
  );
}
