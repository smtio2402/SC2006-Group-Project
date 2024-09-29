import './styles/Signup.modules.css'
import { Link } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function LoginPage() {
  const toast = useToast();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const styles = { fontSize: "40px" };
  const navigate = useNavigate(); // For redirection after login

  // Handle form submission
  const handleLoginClick = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Send the user object in the request body in JSON format to backend
      });
      
      const data = await response.json(); //backend will return a response in JSON format. For now is just a "msg" and token for authentication
      if (response.status === 200) {
        localStorage.setItem('token', data.token); // Store token
        toast({
          title: "Success",
          description: "Logged in successfully!",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        console.log("log in")
        navigate('/home'); // Redirect to home page after successful login
      } else {
        console.error(data.msg);
        toast({
          title: "Error",
          description: data.msg || "Login failed!",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="header">
            <h1>ParkIT!</h1>
          </div>
          <FaCar className='webLogo' />
          <div className='sub-container'>
            <h2 style={styles}>Don't have an account?</h2>
            <Link to="/signup">
              <button className='su-btn'>Sign up</button>
            </Link>
          </div>
        </div>
        <div className="rightcontainer">
          <div className="account-login">
            <h2>Account Login</h2>
            <form onSubmit={handleLoginClick}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <button className="signin-btn" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;