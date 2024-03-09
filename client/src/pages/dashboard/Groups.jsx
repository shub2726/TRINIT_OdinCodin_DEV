import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Input,Flex } from '@chakra-ui/react'

const Groups = () => {
    const [grpID,setID] = useState("")
    const newGRP = async (e) => {
        
    }
  return (
    <>
        <Flex direction="column" gap="10px">
            <Button>New Group</Button>
            <Flex>
                <Input placeholder='Input Unique ID' value={grpID} onChange={(e) => {setID(e.target.value)}}/>
                <Button>Join Group</Button>
            </Flex>
            
        </Flex>
    </>
  )
}

export default Groups