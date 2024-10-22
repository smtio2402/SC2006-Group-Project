import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import ExpenseDashboard from './pages/ExpenseDashboard';
import EditParticulars from './pages/EditParticulars';
import History from './pages/History';
import Feedback from './pages/Feedback';
import CarParkDetailPage from './pages/CarParkDetailPage';

function AppContent() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/carpark/:carparkId"
            element={user ? <CarParkDetailPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/favorites"
            element={user ? <Favorites /> : <Navigate to="/login" />}
          />
          <Route
            path="/expense-dashboard"
            element={user ? <ExpenseDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-particulars"
            element={user ? <EditParticulars /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/feedback"
            element={user ? <Feedback /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
