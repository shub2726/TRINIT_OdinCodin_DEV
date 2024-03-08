import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


function App() {
  return (
      <div>
        <Dashboard />
      </div>
  );
}

export default App;
