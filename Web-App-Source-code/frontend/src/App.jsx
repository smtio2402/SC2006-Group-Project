import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import LoginPage from './LoginPage.jsx';
import Signup from './Signup.jsx';
import HomePage from './HomePage.jsx';
import Dashboard from './Dashboard.jsx';
import History from './History.jsx';
import Feedback from './Feedback.jsx';
import EditParticulars from './EditParticulars.jsx';
import Favourites from './Favourites.jsx';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  

  return (
    <>
    
      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
        <Route path="/favourites" element={<PrivateRoute><Favourites/></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/editParticulars" element={<PrivateRoute><EditParticulars/></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
      
     
      
    </>
  )
}

export default App
