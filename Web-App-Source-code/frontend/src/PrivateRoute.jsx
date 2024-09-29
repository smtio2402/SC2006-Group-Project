import react from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem('token'); // Check if token exists
    return isAuthenticated ? children : <Navigate to="/" />;
  }
  
  export default PrivateRoute;