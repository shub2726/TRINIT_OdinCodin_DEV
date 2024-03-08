import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import QuestionParser from './components/QuestionParser';
import { useEffect } from 'react';

const [Data, setData] = useState("");
const [concatdata,setConcatData] = useState("");

useEffect(() => {
  
}, [])

useEffect(() => {
  Data.ParsedResults.forEach(element => {
    setConcatData(concatdata + element.ParsedText);
  })
}, [Data])

function App() {
  return (
    <div>
      <QuestionParser text={concatdata} />
      <CircularProgress isIndeterminate color='green.300' />
    </div>
  );
}

export default App;
