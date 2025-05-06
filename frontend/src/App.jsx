// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Tenders from "./pages/Tenders";
// // import MyTenders from "./pages/MyTenders";
// import TenderDetails from "./pages/TenderDetails";
// import Unauthorized from "./components/Unauthorized"; // Simple page with "Access Denied" text
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import PrivateRoute from "./components/PrivateRoute";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isOpen, setIsOpen] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <div className="flex flex-1">
//           {isAuthenticated && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
//           <div className="flex-1">
//             {isAuthenticated && <Navbar isOpen={isOpen} />}
//             <div className="p-5 flex-1">
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Navigate to="/dashboard" />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/unauthorized" element={<Unauthorized />} />
//                 <Route path="/notifications" element={<h1>Notifications</h1>} />

//                 {/* Protected Routes */}
//                 <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
//                   {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//                   <Route path="/tenders" element={<Tenders />} />
//                   <Route path="/users" element={<h1>Users Page</h1>} />
//                 </Route>

//                 <Route
//                   element={<PrivateRoute allowedRoles={["tenderowner"]} />}
//                 >
//                   {/* <Route path="/my-tenders" element={<MyTenders />} /> */}
//                   {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//                   <Route path="/profile" element={<h1>MyTenders</h1>} />
//                 </Route>

//                 <Route
//                   element={
//                     <PrivateRoute
//                       allowedRoles={["vendor", "tenderowner", "superadmin"]}
//                     />
//                   }
//                 >
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/tenders/:_id" element={<TenderDetails />} />
//                   <Route path="/profile" element={<h1>My Profile Page</h1>} />
//                 </Route>
//               </Routes>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tenders from "./pages/Tenders";
import TenderDetails from "./pages/TenderDetails";
import Users from "./pages/User.jsx"
import Unauthorized from "./components/Unauthorized";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && isAuthenticated && (
        <div className="flex">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1">
            <Navbar isOpen={isOpen} />
            <main className="p-5">{children}</main>
          </div>
        </div>
      )}
      {hideLayout && <main className="flex-1">{children}</main>}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["superadmin", "tenderowner", "vendor"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tenders/:_id" element={<TenderDetails />} />
            <Route path="/profile" element={<h1>My Profile Page</h1>} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/users" element={<Users/>} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["tenderowner"]} />}>
            <Route path="/my-tenders" element={<h1>My Tenders Page</h1>} />
          </Route>

          <Route path="/notifications" element={<h1>Notifications</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
