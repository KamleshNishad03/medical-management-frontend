// import { Link } from "react-router-dom";

// const BottomNav = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   if (user?.role === "admin") return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50">
//       <div className="grid grid-cols-5 text-center text-xs font-medium text-gray-600">
//         <Link to="/" className="py-3">
//           <div className="text-lg">🏠</div>
//           <div>Home</div>
//         </Link>

//         <Link to="/medicines" className="py-3">
//           <div className="text-lg">💊</div>
//           <div>Meds</div>
//         </Link>

//         <Link to="/upload-prescription" className="py-3">
//           <div className="text-lg">📄</div>
//           <div>Rx</div>
//         </Link>

//         {user && (
//           <Link to="/my-orders" className="py-3">
//             <div className="text-lg">📦</div>
//             <div>Orders</div>
//           </Link>
//         )}

//         <Link to="/cart" className="py-3">
//           <div className="text-lg">🛒</div>
//           <div>Cart</div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BottomNav;


import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `py-3 flex flex-col items-center gap-0.5 transition-colors ${
      isActive(path) ? "text-green-600" : "text-gray-500"
    }`;

  // Admin ka apna bottom nav
  if (user?.role === "admin") {
    return (
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50">
        <div className="grid grid-cols-4 text-center text-xs font-medium">
          <Link to="/admin" className={linkClass("/admin")}>
            <div className="text-lg">📊</div>
            <div>Dashboard</div>
          </Link>
          <Link to="/admin/orders" className={linkClass("/admin/orders")}>
            <div className="text-lg">📦</div>
            <div>Orders</div>
          </Link>
          <Link to="/admin/prescriptions" className={linkClass("/admin/prescriptions")}>
            <div className="text-lg">📄</div>
            <div>Rx</div>
          </Link>
          <Link to="/admin/medicines" className={linkClass("/admin/medicines")}>
            <div className="text-lg">💊</div>
            <div>Medicines</div>
          </Link>
        </div>
      </div>
    );
  }

  // User ka bottom nav
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50">
      <div className="grid grid-cols-5 text-center text-xs font-medium">
        <Link to="/" className={linkClass("/")}>
          <div className="text-lg">🏠</div>
          <div>Home</div>
        </Link>
        <Link to="/medicines" className={linkClass("/medicines")}>
          <div className="text-lg">💊</div>
          <div>Meds</div>
        </Link>
        <Link to="/upload-prescription" className={linkClass("/upload-prescription")}>
          <div className="text-lg">📄</div>
          <div>Rx</div>
        </Link>
        {user && (
          <Link to="/my-orders" className={linkClass("/my-orders")}>
            <div className="text-lg">📦</div>
            <div>Orders</div>
          </Link>
        )}
        <Link to="/cart" className={linkClass("/cart")}>
          <div className="text-lg">🛒</div>
          <div>Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;