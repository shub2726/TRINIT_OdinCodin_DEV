import React from 'react'
import { Accordion, Box, Flex ,Stack} from '@chakra-ui/react'
import { CircularProgress } from '@chakra-ui/react'

const Cards = ({ questions }) => {
    return (
        <>
            {questions.length === 0 ? (
                <CircularProgress isIndeterminate color='green.300' />
            ) : (
                <Stack>
                    {questions.map((q, index) => (
                        <Box bg="green" key={index}>
                            <p>{q.question}</p>
                            <ul>
                                {q.options.map((opt, i) => (
                                    <li key={i}>{opt}</li>
                                ))}
                            </ul>
                        </Box>
                    ))}
                </Stack>
            )}
        </>
    )
}

export default Cards
