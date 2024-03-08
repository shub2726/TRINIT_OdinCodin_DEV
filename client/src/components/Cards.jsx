import React from 'react'
import { Accordion, AccordionIcon,AccordionItem, AccordionButton,AccordionPanel, Box, Flex ,Stack, Button, HStack} from '@chakra-ui/react'
import { CircularProgress } from '@chakra-ui/react'

const Cards = ({ questions }) => {
    return (
        <>
            {questions.length === 0 ? (
                <CircularProgress isIndeterminate color='green.300' />
            ) : (
                <Stack>
                    {questions.map((q, index) => (
                        <Accordion allowToggle key={index}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                        Question {index+1}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <HStack spacing="32px">
                                        <p>{q.question}</p>
                                        <Button>Add Image</Button>
                                    </HStack>
                                    <ul>
                                        {q.options.map((opt, i) => (
                                            <li key={i}>{opt} <Button> Add Image</Button></li>
                                        ))}
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </Stack>
            )}
        </>
    )
}

export default Cards
