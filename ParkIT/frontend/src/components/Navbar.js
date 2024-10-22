import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          ParkIT!
        </Link>
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4">{user.name}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="text-white mr-4 hover:text-green-200">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-green-200">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
