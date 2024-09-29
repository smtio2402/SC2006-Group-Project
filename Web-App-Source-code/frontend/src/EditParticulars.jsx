import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import SideNavBar from './SideNavBar.jsx';
import { set } from 'mongoose';

function EditParticulars() {
  const toast = useToast();
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isWeakPassword, setIsWeakPassword] = useState(false);
  //To check if new password and confirmPassword is the same
  const[isSamePassword, setIsSamePassword] = useState(false);

  // Function to check password strength
  const checkPasswordStrength = () => {
    let isWeak = false;

    // Ensure password exists and perform strength checks
    if (!userPassword.newPassword || userPassword.newPassword.length < 8 || !/[A-Z]/.test(userPassword.newPassword) || !/[0-9]/.test(userPassword.newPassword) || !/[!@#$%^&*/]/.test(userPassword.newPassword)) {
      isWeak = true;
    }
    setIsWeakPassword(isWeak);
    return isWeak;
  };
  
  const checkSamePassword = () => {
    let isSame = false;
    if(userPassword.newPassword === userPassword.confirmPassword){
      isSame = true;
    }
    setIsSamePassword(isSame);
    return isSame;
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Error",
        description: "You are not authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if(checkPasswordStrength()){
      toast({
        title: "Error",
        description: "Password is weak. Please use at least 8 characters, including an uppercase letter, a number, and a special character.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if(!checkSamePassword()){
      toast({
        title: "Error",
        description: "New password and confirm password not the same!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/editPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userPassword), 
      });

      const data = await response.json();
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Password changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Clear the password fields upon successful submission
        setUserPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
      });
      } else if (response.status === 400) {
        toast({
          title: "Error",
          description: "Wrong password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (response.status === 500) {
        toast({
          title: "Error",
          description: "Server error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="homepage-container">
      <div className="left-container">
        <SideNavBar />
      </div>
      <div className="main-content">
        <div className="account-login">
          <h2>Reset password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="input-group">
              <label>Current password</label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={userPassword.currentPassword}
                onChange={(e) =>
                  setUserPassword({ ...userPassword, currentPassword: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>New password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={userPassword.newPassword}
                onChange={(e) =>
                  setUserPassword({ ...userPassword, newPassword: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Confirm new password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={userPassword.confirmPassword}
                onChange={(e) =>
                  setUserPassword({ ...userPassword, confirmPassword: e.target.value })
                }
              />
            </div>
            <button className="signin-btn" type="submit">Change password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditParticulars;
