import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto px-4 flex">
        {user && (
          <nav className="w-1/4 pr-4">
            <ul>
              <li>
                <Link to="/" className="text-green-500 hover:text-green-700">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-green-500 hover:text-green-700"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-green-500 hover:text-green-700"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  to="/expense-dashboard"
                  className="text-green-500 hover:text-green-700"
                >
                  Expense Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/edit-particulars"
                  className="text-green-500 hover:text-green-700"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-green-500 hover:text-green-700"
                >
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <main className={user ? 'w-3/4' : 'w-full'}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   FaHome,
//   FaHeart,
//   FaHistory,
//   FaChartBar,
//   FaCog,
//   FaCommentAlt,
//   FaSignOutAlt,
// } from 'react-icons/fa';

// const Layout = ({ children, user, onLogout }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: '/', icon: FaHome, label: 'Home' },
//     { path: '/favorites', icon: FaHeart, label: 'Favourites' },
//     { path: '/history', icon: FaHistory, label: 'History' },
//     {
//       path: '/expense-dashboard',
//       icon: FaChartBar,
//       label: 'Expense Dashboard',
//     },
//     { path: '/edit-particulars', icon: FaCog, label: 'Edit particulars' },
//     { path: '/feedback', icon: FaCommentAlt, label: 'Submit Feedback' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="w-64 bg-green-500 text-white p-6">
//         <div className="flex items-center mb-8">
//           <img
//             src="/path-to-your-logo.png"
//             alt="ParkIT!"
//             className="w-10 h-10 mr-3"
//           />
//           <h1 className="text-2xl font-bold">ParkIT!</h1>
//         </div>
//         {user && (
//           <nav>
//             <ul>
//               {menuItems.map((item) => (
//                 <li key={item.path} className="mb-4">
//                   <Link
//                     to={item.path}
//                     className={`flex items-center ${
//                       location.pathname === item.path ? 'font-bold' : ''
//                     }`}
//                   >
//                     <item.icon className="mr-3" />
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         )}
//         <div className="mt-auto">
//           {/* <Link to="/logout" className="flex items-center">
//             <FaSignOutAlt className="mr-3" />
//             Log out
//           </Link> */}
//           <div className="flex flex-row items-center">
//             <FaSignOutAlt className="mr-3" />
//             <span onClick={onLogout} className=" text-white">
//               Log out
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto">
//         <main className="p-8">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
