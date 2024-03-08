import { Text , Menu , MenuButton , MenuList, MenuItem, Avatar, Flex, Heading, Spacer } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <Flex as="nav" p="15px" alignItems='center' gap='10px' bgColor='gray.200'>
        <Heading as="h1">WEBSITE</Heading>
        <Spacer />
        <Text fontSize='2xl'>Username</Text>
        <Menu>
            <MenuButton as={Avatar} size="md" bg="teal.500" _hover={{
    cursor: "pointer"
  }}/>
            <MenuList p='3px' boxSize='200px' justifyContent='center' >
                <MenuItem >Your Menu Item 1</MenuItem>
                <MenuItem >Your Menu Item 1</MenuItem>
                <MenuItem >Your Menu Item 1</MenuItem>
                <MenuItem >Your Menu Item 1</MenuItem>
                <MenuItem  color='red'>Sign Out</MenuItem>
                {/* Add more menu items as needed */}
            </MenuList>
        </Menu>
        {/* <Avatar bg='teal.500'/> */}
    </ Flex>
  )
}
