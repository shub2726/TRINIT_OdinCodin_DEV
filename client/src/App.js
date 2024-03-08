import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import QuestionParser from './components/QuestionParser';
import { useEffect } from 'react';

const [Data, setData] = useState("");

useEffect(() => {
  
}, [])

function App() {
  return (
    <div>
      <QuestionParser text={"SCIENCE\t\r\nCLASS IX (THEORY)\t\r\nSAMPLE gUESTION PAPER - 11\t\r\nTime: 3 Hours\tMaximum Marks : 75\t\r\nMultiple Choice Questions\t\r\n1.\tSeema visited a Natural Gas Compressing Unit and found that the gas can\t\r\nbe liquefied under specific conditions of temperature and pressure. While\t\r\nsharing her experience with friends she got confused. Help her to identity\t\r\nthe correct set of conditions.\t\r\n(a) Low temperature, low pressure\t\r\n(b) High temperature, low pressure\t\r\n(c) Low temperature, high pressure\t\r\n(d) High temperature, high pressure\t(1)\t\r\n2.\tWhich of the following are physical changes?\t\r\n(i)\tMelting of iron metal\t\r\n(ii)\tRusting of iron\t\r\n(iii)\tBending of an iron rod\t\r\n(iv)\tDrawing a wire of iron metal\t\r\n(a)\t(i), (ii) and (iii)\t\r\n(b)\t(i), (ii) and (iv)\t\r\n(c)\t(i), (iii) and (iv)\t\r\n(d)\t(ii), (iii) and (iv)\t(1)\t\r\n3.\tWhich one of the following has maximum number of atoms?\t\r\n(a) 18 g of H20\t\r\n(b) 18 g of 02\t\r\n(c) 18 g\t\r\n(d) 18 g of\t(1)\t\r\n4.\tIn a sample of ethyl ethanoate (CH3COOC2H5) the two oxygen atoms have\t\r\nthe same number of electrons but different number of neutrons. Which of\t\r\nthe following is the correct reason for it?\t\r\n(a) One of the oxygen atoms has gained electrons\t\r\n(b) One of the oxygen atoms has gained two neutrons\t\r\n(c) The two oxygen atoms are isotopes\t\r\n(d) The two oxygen atoms are isobars.\t(1)\t\r\n16-04-2018\t\r\n"} />
      <CircularProgress isIndeterminate color='green.300' />
    </div>
  );
}

export default App;
