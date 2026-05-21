// import { useState } from "react";
// import { useAdminNotification } from "../context/AdminNotificationContext";
// import { useNavigate } from "react-router-dom";

// const AdminNotificationBell = () => {
//   const navigate = useNavigate();
//   const {
//     notifications,
//     unreadCount,
//     markAdminAsRead,
//     markAllAdminAsRead,
//     deleteAdminNotification,
//   } = useAdminNotification();

//   const [open, setOpen] = useState(false);

//   const handleOpenNotification = async (item) => {
//     if (!item.isRead) {
//       await markAdminAsRead(item._id);
//     }

//     setOpen(false);

//     if (item.order?._id) {
//       navigate("/admin/orders");
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="relative text-xl bg-white border border-gray-200 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-50"
//       >
//         🔔
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 top-12 w-80 max-h-[420px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
//           <div className="p-3 border-b border-gray-100 flex items-center justify-between">
//             <h3 className="font-semibold text-gray-800">Admin Alerts</h3>
//             <button
//               onClick={markAllAdminAsRead}
//               className="text-sm font-medium text-green-600 hover:text-green-700"
//             >
//               Mark all read
//             </button>
//           </div>

//           {notifications.length === 0 ? (
//             <p className="p-4 text-sm text-gray-500">No admin notifications yet.</p>
//           ) : (
//             notifications.slice(0, 8).map((item) => (
//               <div
//                 key={item._id}
//                 className={`p-3 border-b border-gray-100 ${
//                   item.isRead ? "bg-white" : "bg-green-50"
//                 }`}
//               >
//                 <div
//                   onClick={() => handleOpenNotification(item)}
//                   className="cursor-pointer"
//                 >
//                   <h4 className="text-sm font-semibold text-gray-800 mb-1">
//                     {item.title}
//                   </h4>
//                   <p className="text-xs text-gray-600 mb-1">{item.message}</p>
//                   <p className="text-[11px] text-gray-400">
//                     {new Date(item.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => deleteAdminNotification(item._id)}
//                   className="mt-2 text-xs text-red-500 hover:text-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           )}

//           <div className="p-3 text-center">
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 navigate("/admin/orders");
//               }}
//               className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
//             >
//               View Orders
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminNotificationBell;


import { useState, useRef, useEffect } from "react";
import { useAdminNotification } from "../context/AdminNotificationContext";
import { useNavigate } from "react-router-dom";

const AdminNotificationBell = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAdminAsRead,
    markAllAdminAsRead,
    deleteAdminNotification,
  } = useAdminNotification();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenNotification = async (item) => {
    if (!item.isRead) {
      await markAdminAsRead(item._id);
    }

    setOpen(false);

    if (item.order?._id) {
      navigate("/admin/orders");
    }
  };

  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-xl bg-white border border-gray-200 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-50"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 🔥 Responsive Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="fixed top-16 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-6 w-[90%] max-w-sm max-h-[420px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl z-[9999]"
        >
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Admin Alerts</h3>
            <button
              onClick={markAllAdminAsRead}
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Mark all read
            </button>
          </div>

          {/* Notifications */}
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              No admin notifications yet.
            </p>
          ) : (
            notifications.slice(0, 8).map((item) => (
              <div
                key={item._id}
                className={`p-3 border-b border-gray-100 ${
                  item.isRead ? "bg-white" : "bg-green-50"
                }`}
              >
                <div
                  onClick={() => handleOpenNotification(item)}
                  className="cursor-pointer"
                >
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    {item.message}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteAdminNotification(item._id)}
                  className="mt-2 text-xs text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}

          {/* Footer */}
          <div className="p-3 text-center">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/admin/orders");
              }}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
            >
              View Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationBell;