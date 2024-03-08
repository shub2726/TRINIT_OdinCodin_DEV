import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  console.log(token)
  const ProtectedRoute = ({ children }) => {
    if (token === undefined) {
      return <Navigate to="/" />
    }
    
    return children;
  }

  const ProtectedRouteLogin = ({children}) => {
      if (token !== undefined) {
        return <Navigate to="/dashboard" />;
      }

      return children
  }

  return (
<<<<<<< HEAD
      <div>
        <Dashboard />
      </div>
=======
    <Router>
      <Routes>
        <Route path="*" element = {<h1>404</h1>}/>
        <Route path="/">
          <Route index element={<ProtectedRouteLogin><Login/></ProtectedRouteLogin>} />
        </Route>
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
    </Router>
>>>>>>> 249664337b2357085c9d7e2ce0d21c80b3cddd1e
  );
}

export default App;
