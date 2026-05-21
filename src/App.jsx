


// import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Medicines from "./pages/Medicines";
// import MedicineDetails from "./pages/MedicineDetails";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import MyOrders from "./pages/MyOrders";
// import MyPrescriptions from "./pages/MyPrescriptions";
// import UploadPrescription from "./pages/UploadPrescription";
// import AdminLayout from "./components/AdminLayout";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminPrescriptions from "./pages/AdminPrescriptions";
// import AdminMedicines from "./pages/AdminMedicines";
// import { NotificationProvider } from "./context/NotificationContext";
// import { AdminNotificationProvider } from "./context/AdminNotificationContext";
// import Notifications from "./pages/Notifications";
// import Navbar from "./components/Navbar";

// const App = () => {
//   const [authModal, setAuthModal] = useState({
//     open: false,
//     type: "login",
//   });

//   const openLoginModal = () => {
//     setAuthModal({ open: true, type: "login" });
//   };

//   const openRegisterModal = () => {
//     setAuthModal({ open: true, type: "register" });
//   };

//   const closeAuthModal = () => {
//     setAuthModal((prev) => ({ ...prev, open: false }));
//   };

//   const switchToLogin = () => {
//     setAuthModal({ open: true, type: "login" });
//   };

//   const switchToRegister = () => {
//     setAuthModal({ open: true, type: "register" });
//   };

//   useEffect(() => {
//     document.body.style.overflow = authModal.open ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [authModal.open]);

//   return (
//     <NotificationProvider>
//       <AdminNotificationProvider>
//         <>
//           <Navbar
//             openLoginModal={openLoginModal}
//             openRegisterModal={openRegisterModal}
//           />

//           <Routes>
//             <Route
//               path="/"
//               element={<Home openLoginModal={openLoginModal} />}
//             />
//             <Route path="/medicines" element={<Medicines />} />
//             <Route path="/medicines/:id" element={<MedicineDetails />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/my-orders" element={<MyOrders />} />
//             <Route path="/my-prescriptions" element={<MyPrescriptions />} />
//             <Route path="/upload-prescription" element={<UploadPrescription />} />
//             <Route path="/notifications" element={<Notifications />} />

//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<AdminDashboard />} />
//               <Route path="orders" element={<AdminOrders />} />
//               <Route path="prescriptions" element={<AdminPrescriptions />} />
//               <Route path="medicines" element={<AdminMedicines />} />
//             </Route>
//           </Routes>

//           {authModal.open && (
//             <div
//               className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
//               onClick={closeAuthModal}
//             >
//               <div
//                 className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 animate-modal"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   onClick={closeAuthModal}
//                   className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-lg font-bold"
//                 >
//                   ×
//                 </button>

//                 {authModal.type === "login" ? (
//                   <Login
//                     isModal={true}
//                     onClose={closeAuthModal}
//                     switchToRegister={switchToRegister}
//                   />
//                 ) : (
//                   <Register
//                     isModal={true}
//                     switchToLogin={switchToLogin}
//                   />
//                 )}
//               </div>
//             </div>
//           )}
//         </>
//       </AdminNotificationProvider>
//     </NotificationProvider>
//   );
// };

// export default App;



import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Medicines from "./pages/Medicines";
import MedicineDetails from "./pages/MedicineDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import MyPrescriptions from "./pages/MyPrescriptions";
import UploadPrescription from "./pages/UploadPrescription";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AdminPrescriptions from "./pages/AdminPrescriptions";
import AdminMedicines from "./pages/AdminMedicines";
import { NotificationProvider } from "./context/NotificationContext";
import { AdminNotificationProvider } from "./context/AdminNotificationContext";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";

const App = () => {
  const [authModal, setAuthModal] = useState({ open: false, type: "login" });

  const openLoginModal = () => setAuthModal({ open: true, type: "login" });
  const openRegisterModal = () => setAuthModal({ open: true, type: "register" });
  const closeAuthModal = () => setAuthModal((prev) => ({ ...prev, open: false }));
  const switchToLogin = () => setAuthModal({ open: true, type: "login" });
  const switchToRegister = () => setAuthModal({ open: true, type: "register" });

  useEffect(() => {
    document.body.style.overflow = authModal.open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [authModal.open]);

  return (
    <NotificationProvider>
      <AdminNotificationProvider>
        <>
          <Navbar
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
          />

          <Routes>
            <Route path="/" element={<Home openLoginModal={openLoginModal} />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicines/:id" element={<MedicineDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-prescriptions" element={<MyPrescriptions />} />
            <Route path="/upload-prescription" element={<UploadPrescription />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="prescriptions" element={<AdminPrescriptions />} />
              <Route path="medicines" element={<AdminMedicines />} />
            </Route>
          </Routes>

          {authModal.open && (
            <div
              className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
              onClick={closeAuthModal}
            >
              <div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 animate-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeAuthModal}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-lg font-bold"
                >
                  ×
                </button>

                {authModal.type === "login" ? (
                  <Login isModal={true} onClose={closeAuthModal} switchToRegister={switchToRegister} />
                ) : (
                  <Register isModal={true} switchToLogin={switchToLogin} />
                )}
              </div>
            </div>
          )}
        </>
      </AdminNotificationProvider>
    </NotificationProvider>
  );
};

export default App;