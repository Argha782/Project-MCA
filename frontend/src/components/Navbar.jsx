// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { AuthContext } from "../../auth/AuthContext";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const { logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     logout();                // use context logout
//     window.location.href = "/login";  // no need to manually reload
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <nav className="sticky top-0 bg-blue-900 text-white flex justify-between items-center px-6 py-2 shadow">
//       <a href="/dashboard" className="flex items-center space-x-5 rtl:space-x-reverse">
//         <img src="AEGCL_logo.jpg" className="h-9 w-9" alt="AEGCL Logo" />
//         <span className="self-center text-2xl font-semibold whitespace-nowrap">
//         ASSAM ELECTRICITY GRID CORPORATION
//         </span>
//       </a>

//       <div className="relative">
//         <button
//           onClick={toggleDropdown}
//           className="text-4xl focus:outline-none"
//         >
//           <FaUserCircle />
//         </button>
//         {dropdownOpen && (
          // <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
          //   <ul className="py-1">
          //     <li
          //       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          //       onClick={() => {
          //         navigate("/profile");
          //         setDropdownOpen(false);
          //       }}
          //     >
          //       My Profile
          //     </li>
          //     <li>
          //       <button
          //       onClick={handleLogout}
          //       className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
          //     >
          //       <LogOut className="w-4 h-4 mr-2" />
          //       Log Out
          //     </button>
          //     </li>
          //   </ul>
          // </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="w-full bg-white shadow px-5 py-3 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <img src="AEGCL_logo.jpg" alt="AEGCL Logo" className="w-12 h-12" />
//         <span className="text-xl font-bold text-blue-700">AEGCL Tender Portal</span>
//       </div>

//       {user ? (
//         <div className="flex items-center space-x-6">
//           <span className="text-sm text-gray-700">Logged in as <strong>{user.role}</strong></span>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//           >
//             Log Out
//           </button>
//         </div>
//       ) : (
//         <Link
//           to="/login"
//           className="text-blue-600 hover:underline text-sm font-semibold"
//         >
//           Sign In
//         </Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
<nav className="sticky top-0 w-full z-50 bg-blue-900 border-b p-4 shadow flex justify-between items-center h-16">
      <div className="text-xl font-bold text-white">ASSAM ELECTRICITY GRID CORPORATION</div>

      {isAuthenticated && (
        <div className="relative">
          <UserCircle2
            className="w-12 h-12 cursor-pointer text-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            <ul className="py-1 text-xl">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setIsDropdownOpen(false);
                }}
              >
                My Profile
              </li>
              <li>
                <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
              >
                <LogOut className="w-6 h-6 mr-2" />
                Log Out
              </button>
              </li>
            </ul>
          </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

