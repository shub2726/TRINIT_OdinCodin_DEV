import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Friends from './pages/dashboard/friends';
import { ChakraProvider } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel, Box, Stack, Button, ButtonGroup } from '@chakra-ui/react'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import Groups from './pages/dashboard/Groups';
import GroupID from './components/GroupID';
import AddTest from './components/addTest';
import AddTestView from './components/addTestView';
import TestInterface from './pages/TestInterface';

function App() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const ProtectedRoute = ({ children }) => {
    if (token === undefined) {
      return <Navigate to="/" />
    }

    return children;
  }

  const ProtectedRouteLogin = ({ children }) => {
    if (token !== undefined) {
      return <Navigate to="/dashboard" />;
    }

    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/">
          <Route index element={<ProtectedRouteLogin><Login /></ProtectedRouteLogin>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestInterface />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Box display="flex" height="100vh">
              <Box width="15%" p="4"
                borderWidth="1px"
                overflow="hidden"
                boxShadow="lg">
                <Stack spacing={4} direction='column' align='center'>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                    Tests
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Groups
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Friends
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Add test
                  </Button>
                </Stack>
              </Box>
              <Dashboard />
            </Box>
          </ProtectedRoute>} />

        <Route path="/friends" element={
          <ProtectedRoute>
            <Navbar />
            <Box display="flex" height="100vh">
              <Box width="15%" p="4"
                borderWidth="1px"
                overflow="hidden"
                boxShadow="lg">
                <Stack spacing={4} direction='column' align='center'>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                    Tests
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Groups
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Friends
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Add test
                  </Button>
                </Stack>
              </Box>
              <Friends />
            </Box>
          </ProtectedRoute>} />

        <Route path="/addtest" element={
          <ProtectedRoute>
            <Navbar />
            <Box display="flex" height="100vh">
              <Box width="15%" p="4"
                borderWidth="1px"
                overflow="hidden"
                boxShadow="lg">
                <Stack spacing={4} direction='column' align='center'>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                    Tests
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Groups
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Friends
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Add test
                  </Button>
                </Stack>
              </Box>
              <AddTestView />
            </Box>
          </ProtectedRoute>} />

          <Route path="/groups" element={
          <ProtectedRoute>
            <Navbar />
            <Box display="flex" height="100vh">
              <Box width="15%" p="4"
                borderWidth="1px"
                overflow="hidden"
                boxShadow="lg">
                <Stack spacing={4} direction='column' align='center'>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                    Tests
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Groups
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Friends
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Add test
                  </Button>
                </Stack>
              </Box>
              <Groups/>
            </Box>
          </ProtectedRoute>} />
          <Route path="/groups/:id" element={
          <ProtectedRoute>
            <Navbar />
            <Box display="flex" height="100vh">
              <Box width="15%" p="4"
                borderWidth="1px"
                overflow="hidden"
                boxShadow="lg">
                <Stack spacing={4} direction='column' align='center'>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" /><path d="M15 7h6v6" /></svg>
                    Tests
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Groups
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Friends
                  </Button>
                  <Button colorScheme='teal' size='lg' width="100%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Add test
                  </Button>
                </Stack>
              </Box>
              <GroupID/>
            </Box>
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
