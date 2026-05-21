


// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import AdminNotificationBell from "./AdminNotificationBell";
// import logo from "../assets/logo.jpeg";

// const AdminLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   if (!user || user.role !== "admin") {
//     return null;
//   }

//   const navItems = [
//     { label: "Dashboard", path: "/admin" },
//     { label: "Orders", path: "/admin/orders" },
//     { label: "Prescriptions", path: "/admin/prescriptions" },
//     { label: "Medicines", path: "/admin/medicines" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f6fff7] flex">

//       {/* ✅ Sidebar → ONLY Desktop */}
//       <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        
//         <div className="px-6 py-5 border-b border-gray-100">
//           <Link to="/" className="text-2xl font-extrabold">
//             <div className="flex justify-center">
//               <img src={logo} alt="logo" className="h-20 w-40" />
//             </div>
//             <span className="text-green-600">Apna</span>
//             <span className="text-orange-500">Care</span>
//           </Link>
//           <p className="text-sm text-gray-500 mt-2">Admin Panel</p>
//         </div>

//         <nav className="p-4 space-y-2">
//           {navItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`block rounded-2xl px-4 py-3 font-medium ${
//                   active
//                     ? "bg-green-600 text-white"
//                     : "text-gray-700 hover:bg-green-50"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* ✅ Desktop logout (only here) */}
//         <div className="px-4 pb-4 mt-auto">
//           <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl bg-gray-50 px-4 py-3">
//             <div className="text-sm text-gray-600">
//               Hi, <span className="font-semibold">{user.name}</span>
//             </div>
//             <AdminNotificationBell />
//           </div>

//           <button
//             onClick={handleLogout}
//             className="w-full rounded-2xl border border-red-500 text-red-500 py-3 font-semibold hover:bg-red-50"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 min-w-0">

//         {/* ✅ Header → Mobile + Tablet */}
//         <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
//           <Link to="/admin" className="text-xl font-extrabold">
//             <span className="text-green-600">Apna</span>
//             <span className="text-orange-500">Care</span>
//           </Link>

//           <div className="flex items-center gap-3">
//             <AdminNotificationBell />

//             {/* ✅ SINGLE Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="px-3 py-2 rounded-xl border border-red-500 text-red-500 text-sm font-medium"
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* ✅ Nav → Mobile + Tablet */}
//         <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-100 flex gap-2 overflow-x-auto">
//           {navItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
//                   active
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}
//         </div>

//         <main className="p-4 md:p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;




import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import AdminNotificationBell from "./AdminNotificationBell";
import logo from "../assets/logo.jpeg";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Prescriptions", path: "/admin/prescriptions" },
    { label: "Medicines", path: "/admin/medicines" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fff7] flex">

      {/* Sidebar — Desktop only */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="px-6 py-5 border-b border-gray-100">
          <Link to="/" className="text-2xl font-extrabold">
            <div className="flex justify-center">
              <img src={logo} alt="ApnaCare logo" className="h-20 w-40 object-contain" />
            </div>
            <span className="text-green-600">Apna</span>
            <span className="text-orange-500">Care</span>
          </Link>
          <p className="text-sm text-gray-500 mt-2">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block rounded-2xl px-4 py-3 font-medium transition-colors ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-4 mt-auto">
          <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-600 truncate">
              Hi, <span className="font-semibold">{user.name}</span>
            </div>
            <AdminNotificationBell />
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-2xl border border-red-500 text-red-500 py-3 font-semibold hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">

        {/* Header — Mobile + Tablet */}
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <img
              src={logo}
              alt="ApnaCare logo"
              className="h-9 w-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span className="text-lg font-extrabold">
              <span className="text-green-600">Apna</span>
              <span className="text-orange-500">Care</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <AdminNotificationBell />
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Nav tabs — Mobile + Tablet */}
        <div className="lg:hidden bg-white border-b border-gray-100 px-3 py-2.5 flex gap-2 overflow-x-auto" style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;