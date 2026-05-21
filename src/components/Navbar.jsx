
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import logo from "../assets/logo.jpeg";
// import NotificationBell from "./NotificationBell";

// const Navbar = ({ openLoginModal, openRegisterModal }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const syncUser = () => {
//       const storedUser = JSON.parse(localStorage.getItem("user") || "null");
//       setUser(storedUser);
//     };

//     syncUser();
//     window.addEventListener("storage", syncUser);

//     return () => {
//       window.removeEventListener("storage", syncUser);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//     setUser(null);
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logo} alt="logo" className="h-10 w-auto" />
//           <span className="text-xl font-bold">
//             <span className="text-green-600">Apna</span>
//             <span className="text-orange-500">Care</span>
//           </span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
//           <Link to="/">Home</Link>

//           {user && user.role !== "admin" && (
//             <>
//               <Link to="/medicines">Medicines</Link>
//               <Link to="/upload-prescription">Prescription</Link>
//               <Link to="/cart">Cart</Link>
//               <Link to="/my-orders">My Orders</Link>
//               <Link to="/my-prescriptions">My Prescriptions</Link>
//               <Link to="/notifications">Notifications</Link>
//             </>
//           )}

//           {user?.role === "admin" && (
//             <Link to="/admin" className="text-orange-600 font-semibold">
//               Dashboard
//             </Link>
//           )}
//         </nav>

//         <div className="flex items-center gap-3">
//           {user ? (
//             <>
//               {user.role !== "admin" && <NotificationBell />}

//               <span className="hidden sm:block text-sm font-medium text-gray-700">
//                 Hi, {user.name}
//               </span>

//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 rounded-full border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={openLoginModal}
//                 className="hidden sm:inline-block px-4 py-2 rounded-full border border-green-600 text-green-600 text-sm font-medium hover:bg-green-50"
//               >
//                 Login
//               </button>

//               <button
//                 onClick={openRegisterModal}
//                 className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700"
//               >
//                 Sign Up
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;



import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import NotificationBell from "./NotificationBell";

const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  if (isAdminPage) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">
            <span className="text-green-600">Apna</span>
            <span className="text-orange-500">Care</span>
          </span>
        </Link>

        {/* ✅ Changed md:flex → lg:flex */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/">Home</Link>

          {user && user.role !== "admin" && (
            <>
              <Link to="/medicines">Medicines</Link>
              <Link to="/upload-prescription">Prescription</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/my-orders">My Orders</Link>
              <Link to="/my-prescriptions">My Prescriptions</Link>
              <Link to="/notifications">Notifications</Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="text-orange-600 font-semibold">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.role !== "admin" && <NotificationBell />}

              {/* ✅ Changed sm:block → lg:block */}
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* ✅ Changed sm:inline-block → lg:inline-block */}
              <button
                onClick={openLoginModal}
                className="hidden lg:inline-block px-4 py-2 rounded-full border border-green-600 text-green-600 text-sm font-medium hover:bg-green-50"
              >
                Login
              </button>

              <button
                onClick={openRegisterModal}
                className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;