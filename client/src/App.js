import logo from './logo.svg';
import './App.css';
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
  );
}

export default App;
