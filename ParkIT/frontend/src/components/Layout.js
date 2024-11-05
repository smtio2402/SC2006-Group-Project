import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaHeart,
  FaHistory,
  FaChartBar,
  FaCog,
  FaCommentAlt,
  FaSignOutAlt,
  FaRegUser,
} from 'react-icons/fa';

const Layout = ({ children, user, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/favorites', icon: FaHeart, label: 'Favourites' },
    { path: '/history', icon: FaHistory, label: 'History' },
    {
      path: '/expense-dashboard',
      icon: FaChartBar,
      label: 'Expense Dashboard',
    },
    { path: '/edit-particulars', icon: FaCog, label: 'Edit particulars' },
    { path: '/feedback', icon: FaCommentAlt, label: 'Submit Feedback' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          user ? 'w-64 p-6' : 'w-96'
        } bg-[#70b49c] text-white relative`}
      >
        {!user ? (
          <>
            <div className="absolute inset-0 bg-emerald-600/40"></div>
            <img
              src="/static/images/bg-starting-page.png"
              alt="Map background"
              className="object-cover w-full h-full opacity-10"
            />
          </>
        ) : (
          <></>
        )}
        <Link
          className={`flex items-center mb-4 ${
            !user ? 'absolute z-10 top-8 left-8' : ''
          }`}
          to="/"
        >
          <img
            src="static/images/parking-icon.svg"
            alt="ParkIT!"
            className="w-10 h-10 mr-3"
          />
          <h1 className="text-2xl font-bold">ParkIT!</h1>
        </Link>
        {user && (
          <div className="flex flex-row items-center mb-10">
            <FaRegUser className="mr-3" size={20} />
            <p className="text-l">{user.name}</p>
          </div>
        )}
        {user && (
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className="mb-4">
                  <Link
                    to={item.path}
                    className={`flex items-center hover:font-bold ${
                      location.pathname === item.path ? 'font-bold' : ''
                    }`}
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <div className="flex flex-row items-center">
                  <FaSignOutAlt className="mr-3" />
                  <span
                    onClick={onLogout}
                    className=" text-white hover:font-bold hover:cursor-pointer"
                  >
                    Log out
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        )}
        {!user && (
          <div className="absolute top-[40vh] w-full">
            {location.pathname === '/login' ? (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Don't have an account?
                </h2>
                <div className="flex flex-col gap-4 items-center">
                  <Link to="/register">
                    <button className="text-white text-lg hover:scale-110 transition-transform duration-200 border px-5 py-2 rounded-full">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">
                  Welcome Back!
                </h2>
                <div className="flex flex-col gap-4 items-center">
                  <Link to="/login">
                    <button className="text-white text-lg hover:scale-110 transition-transform duration-200 border px-5 py-2 rounded-full">
                      Sign In
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';

// const Layout = ({ children, user, onLogout }) => {
//   return (
//     <div>
//       <Navbar user={user} onLogout={onLogout} />
//       <div className="container mx-auto px-4 flex">
//         {user && (
//           <nav className="w-1/4 pr-4">
//             <ul>
//               <li>
//                 <Link to="/" className="text-green-500 hover:text-green-700">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/favorites"
//                   className="text-green-500 hover:text-green-700"
//                 >
//                   Favorites
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/history"
//                   className="text-green-500 hover:text-green-700"
//                 >
//                   History
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/expense-dashboard"
//                   className="text-green-500 hover:text-green-700"
//                 >
//                   Expense Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/edit-particulars"
//                   className="text-green-500 hover:text-green-700"
//                 >
//                   Change Password
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/feedback"
//                   className="text-green-500 hover:text-green-700"
//                 >
//                   Submit Feedback
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         )}
//         <main className={user ? 'w-3/4' : 'w-full'}>{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
