import React, { useState } from 'react';
import './styles/Signup.modules.css';
import { Link } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "" 
  });
  const styles = { fontSize: "40px" };

  // State for password and alert visibility
  const [isWeakPassword, setIsWeakPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Function to check password strength
  const checkPasswordStrength = () => {
    let isWeak = false;

    // Ensure password exists and perform strength checks
    if (!newUser.password || newUser.password.length < 8 || !/[A-Z]/.test(newUser.password) || !/[0-9]/.test(newUser.password) || !/[!@#$%^&*/]/.test(newUser.password)) {
      isWeak = true;
    }
    setIsWeakPassword(isWeak);
    return isWeak;
  };

  // Handle form submission
  const handleSignUpClick = async (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page
    
    // Check password strength
    if (!checkPasswordStrength()) {
      try {
        // Make the POST request to the backend API
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser) // Send the newUser object in the request body
        });

        // Parse the response
        const data = await response.json();

        // Check for errors or success
        if (response.status === 201) {
            console.log(data.msg); // "User logged in successfully"
            toast({
              title:"Success",
              description:"Account created successfully",
              status:"success",
              duration:3000, //3s
              isClosable:true
            })
            navigate('/');
        } else {
            console.error(data.msg);
            toast({
              title:"Error",
              description:"Invalid email or password!",
              status:"error",
              duration:3000, //3s
              isClosable:true
            })
        }
    } catch (error) {
        console.error("Error occurred during sign-up:", error);
    }
    } else {
      setShowAlert(true);
      return; // Show alert if the password is weak
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="header">
          <h1>ParkIT!</h1>
        </div>
        <FaCar className='webLogo' />
        
        <div className='sub-container'>
          <h2 style={styles}>Welcome Back!</h2>
          <p>Have an account? Login here!</p>
          <Link to="/">
            <button className='su-btn'>Log In</button>
          </Link> 
        </div>
      </div> 
      
      <div className="login-page">
        <div className="rightcontainer">
          <div className="login-container">
            <div className="create-account">
              <h2>Create Account</h2>

              {/* Add a form element */}
              <form onSubmit={handleSignUpClick}>
                <div className="input-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    value={newUser.email}
                  />
                </div>

                <div className="input-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    value={newUser.name}
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    value={newUser.password}
                  />
                </div>

                {/* Conditionally render the dismissible alert */}
                {showAlert && (
                  <div className="alert alert-danger">
                    <p>Password is weak. Please use at least 8 characters, including an uppercase letter, a number, and a special character.</p>
                    <button className="close-btn" onClick={() => setShowAlert(false)}>X</button>
                  </div>
                )}

                {/* Use button type "submit" to trigger the form submission */}
                <button className="signup-btn" type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
