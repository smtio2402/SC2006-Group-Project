import './styles/sideNavBar.modules.css';
import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

function SideNavBar() {
    const navigate = useNavigate()
    const toast = useToast()
    const handleLogout = () => {
        // Clear local storage/session storage 
        localStorage.removeItem('token');
    
        toast({
          title: "Logged out",
          description: "You have been logged out successfully.",
          status: "info",
          duration: 3000,
          isClosable: true
        });
    
        // Redirect to login page
        navigate('/');
      };
    return (
        <>
            <div className='container2'>
                <div className='home'>
                    <GoHome className='homelogo' />
                    <Link to='/home'>
                        <h2>Home</h2>
                    </Link>
                </div>
                <div className='favourites'>
                    <CiHeart className='heartlogo' />
                    <Link to='/favourites'>
                        <h2>Favourites</h2>
                    </Link>
                </div>
                <div className='history'>
                    <MdHistory className='historylogo' />
                    <Link to='/history'>
                        <h2>History</h2>
                    </Link>
                </div>
                <div className='dashboard'>
                    <LuLayoutDashboard className='dashboardlogo' />
                    <Link to='/dashboard'>
                        <h2>Expense Dashboard</h2>
                    </Link>
                </div>
                <div className='particulars'>
                    <IoSettingsOutline className='particularslogo' />
                    <Link to='/editParticulars'>
                        <h2>Edit Particulars</h2>
                    </Link>
                </div>
                <div className='feedback'>
                    <MdOutlineFeedback className='feedbacklogo' />
                    <Link to='/feedback'>
                        <h2>Submit feedback</h2>
                    </Link>
                </div>
                <button className='logout-btn' onClick={handleLogout}>Log Out</button>
            </div>
        </>
    );
}

export default SideNavBar;