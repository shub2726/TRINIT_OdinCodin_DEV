import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


function App() {
  return (
      <div>
        <CircularProgress isIndeterminate color='green.300' />
      </div>
  );
}

export default App;
