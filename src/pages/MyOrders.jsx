


// import { useEffect, useState } from "react";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import UserTrackOrderModal from "../components/UserTrackOrderModal";
// import { socket } from "../socket";

// const statusColors = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   Confirmed: "bg-blue-100 text-blue-700",
//   PickedUp: "bg-indigo-100 text-indigo-700",
//   Shipped: "bg-purple-100 text-purple-700",
//   Delivered: "bg-green-100 text-green-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// const paymentColors = {
//   Pending: "bg-orange-100 text-orange-700",
//   Paid: "bg-green-100 text-green-700",
// };

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState("");
//   const [trackingOrderId, setTrackingOrderId] = useState("");
//   const [openTimeline, setOpenTimeline] = useState(null);
//   const [cancelLoading, setCancelLoading] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setPageError("");
//       const { data } = await api.get("/orders/my");
//       if (data?.success) {
//         setOrders(data.orders || []);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load orders");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     const confirm = window.confirm("Kya aap sach mein yeh order cancel karna chahte hain?");
//     if (!confirm) return;
//     try {
//       setCancelLoading(orderId);
//       const { data } = await api.put(`/orders/admin/status/${orderId}`, {
//         status: "Cancelled",
//       });
//       if (data?.success) {
//         fetchOrders();
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Cancel failed");
//     } finally {
//       setCancelLoading("");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();

//     socket.on("orderTrackingUpdated", (updatedData) => {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedData.orderId
//             ? { ...order, ...updatedData }
//             : order
//         )
//       );
//     });

//     return () => {
//       socket.off("orderTrackingUpdated");
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">

//         <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//           <p className="text-sm text-green-100">Order History</p>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">My Orders</h1>
//           <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
//             Track your medicines and payment progress.
//           </p>
//         </div>

//         {loading && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             Loading orders...
//           </div>
//         )}

//         {!loading && pageError && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-red-600">
//             {pageError}
//           </div>
//         )}

//         {!loading && orders.length === 0 && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             No orders placed yet
//           </div>
//         )}

//         {!loading && orders.length > 0 && (
//           <div className="space-y-5 mt-6">
//             {orders.map((order) => {
//               const canTrack = ["PickedUp", "Shipped"].includes(order.status);
//               // const canCancel = order.status === "Pending";
//               const canCancel = ["Pending", "Confirmed"].includes(order.status);

//               return (
//                 <div
//                   key={order._id}
//                   className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
//                 >
//                   {/* Order header */}
//                   <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
//                     <div>
//                       <h2 className="font-bold text-gray-800">
//                         Order #{order._id.slice(-6).toUpperCase()}
//                       </h2>
//                       <p className="text-sm text-gray-500 mt-0.5">{order.address}</p>
//                     </div>

//                     <div className="flex flex-col items-start sm:items-end gap-2">
//                       <p className="text-green-600 font-bold text-lg">
//                         ₹{order.totalAmount}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
//                           {order.status}
//                         </span>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
//                           {order.paymentStatus}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Admin delivery message */}
//                   {order.adminMessage && (
//                     <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-200 px-4 py-3 flex gap-3 items-start">
//                       <span className="text-xl mt-0.5">🕐</span>
//                       <div>
//                         <p className="text-xs font-semibold text-blue-700 mb-0.5">
//                           Delivery Update from Store
//                         </p>
//                         <p className="text-sm text-blue-800">{order.adminMessage}</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Timeline toggle */}
//                   <div className="mt-4">
//                     <button
//                       onClick={() =>
//                         setOpenTimeline(openTimeline === order._id ? null : order._id)
//                       }
//                       className="text-sm font-semibold text-blue-600 hover:underline"
//                     >
//                       {openTimeline === order._id ? "Hide Timeline ▲" : "View Timeline ▼"}
//                     </button>

//                     {openTimeline === order._id && (
//                       <div className="mt-3 space-y-2">
//                         {order.statusHistory?.length > 0 ? (
//                           order.statusHistory.map((entry, index) => (
//                             <div
//                               key={index}
//                               className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm"
//                             >
//                               <p className="font-medium text-gray-800">{entry.status}</p>
//                               <p className="text-gray-500">{entry.note}</p>
//                               <p className="text-xs text-gray-400 mt-1">
//                                 {new Date(entry.changedAt).toLocaleString()}
//                               </p>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-sm text-gray-500">No history available</p>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Track + Cancel + Progress */}
//                   <div className="mt-4 flex flex-wrap items-center gap-3">
//                     {canTrack && (
//                       <button
//                         onClick={() => setTrackingOrderId(order._id)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Track Order
//                       </button>
//                     )}

//                     {canCancel && (
//                       <button
//                         onClick={() => cancelOrder(order._id)}
//                         disabled={cancelLoading === order._id}
//                         className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-50 disabled:opacity-60 transition-colors"
//                       >
//                         {cancelLoading === order._id ? "Cancelling..." : "Cancel Order"}
//                       </button>
//                     )}

//                     {order.deliveryProgress > 0 && (
//                       <span className="text-sm text-gray-600">
//                         Progress:{" "}
//                         <span className="font-semibold text-green-600">
//                           {order.deliveryProgress}%
//                         </span>
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       <BottomNav />

//       {trackingOrderId && (
//         <UserTrackOrderModal
//           orderId={trackingOrderId}
//           onClose={() => setTrackingOrderId("")}
//         />
//       )}
//     </div>
//   );
// };

// export default MyOrders;






// import { useEffect, useState } from "react";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import UserTrackOrderModal from "../components/UserTrackOrderModal";
// import { socket } from "../socket";

// const statusColors = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   Confirmed: "bg-blue-100 text-blue-700",
//   PickedUp: "bg-indigo-100 text-indigo-700",
//   Shipped: "bg-purple-100 text-purple-700",
//   Delivered: "bg-green-100 text-green-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// const paymentColors = {
//   Pending: "bg-orange-100 text-orange-700",
//   Paid: "bg-green-100 text-green-700",
// };

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState("");
//   const [trackingOrderId, setTrackingOrderId] = useState("");
//   const [openTimeline, setOpenTimeline] = useState(null);
//   const [cancelLoading, setCancelLoading] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setPageError("");
//       const { data } = await api.get("/orders/my");
//       if (data?.success) {
//         setOrders(data.orders || []);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load orders");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ FIXED FUNCTION
//   const cancelOrder = async (orderId) => {
//     const confirm = window.confirm("Kya aap sach mein yeh order cancel karna chahte hain?");
//     if (!confirm) return;

//     try {
//       setCancelLoading(orderId);

//       // ✅ USER CANCEL API CALL (NOT ADMIN)
//       const { data } = await api.put(`/orders/cancel-order/${orderId}`);

//       if (data?.success) {
//         fetchOrders();
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Cancel failed");
//     } finally {
//       setCancelLoading("");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     if (orders.length === 0) return;

//     orders.forEach((order) => {
//       socket.emit("joinOrderRoom", order._id);
//     });

//     const handleOrderUpdate = (updatedData) => {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedData.orderId
//             ? { ...order, ...updatedData }
//             : order
//         )
//       );
//     };

//     socket.on("orderTrackingUpdated", handleOrderUpdate);

//     return () => {
//       orders.forEach((order) => {
//         socket.emit("leaveOrderRoom", order._id);
//       });
//       socket.off("orderTrackingUpdated", handleOrderUpdate);
//     };
//   }, [orders.length]);

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">

//         <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//           <p className="text-sm text-green-100">Order History</p>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">My Orders</h1>
//           <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
//             Track your medicines and payment progress.
//           </p>
//         </div>

//         {loading && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             Loading orders...
//           </div>
//         )}

//         {!loading && pageError && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-red-600">
//             {pageError}
//           </div>
//         )}

//         {!loading && orders.length === 0 && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             No orders placed yet
//           </div>
//         )}

//         {!loading && orders.length > 0 && (
//           <div className="space-y-5 mt-6">
//             {orders.map((order) => {
//               const canTrack = ["PickedUp", "Shipped"].includes(order.status);
//               const canCancel = ["Pending", "Confirmed"].includes(order.status);

//               return (
//                 <div
//                   key={order._id}
//                   className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
//                 >
//                   <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
//                     <div>
//                       <h2 className="font-bold text-gray-800">
//                         Order #{order._id.slice(-6).toUpperCase()}
//                       </h2>
//                       <p className="text-sm text-gray-500 mt-0.5">{order.address}</p>
//                     </div>

//                     <div className="flex flex-col items-start sm:items-end gap-2">
//                       <p className="text-green-600 font-bold text-lg">
//                         ₹{order.totalAmount}
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                           {order.status}
//                         </span>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus]}`}>
//                           {order.paymentStatus}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {order.adminMessage && (
//                     <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-200 px-4 py-3 flex gap-3 items-start">
//                       <span className="text-xl mt-0.5">🕐</span>
//                       <div>
//                         <p className="text-xs font-semibold text-blue-700 mb-0.5">
//                           Delivery Update from Store
//                         </p>
//                         <p className="text-sm text-blue-800">{order.adminMessage}</p>
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-4 flex flex-wrap items-center gap-3">
//                     {canTrack && (
//                       <button
//                         onClick={() => setTrackingOrderId(order._id)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
//                       >
//                         Track Order
//                       </button>
//                     )}

//                     {canCancel && (
//                       <button
//                         onClick={() => cancelOrder(order._id)}
//                         disabled={cancelLoading === order._id}
//                         className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-50 disabled:opacity-60"
//                       >
//                         {cancelLoading === order._id ? "Cancelling..." : "Cancel Order"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       <BottomNav />

//       {trackingOrderId && (
//         <UserTrackOrderModal
//           orderId={trackingOrderId}
//           onClose={() => setTrackingOrderId("")}
//         />
//       )}
//     </div>
//   );
// };

// export default MyOrders;






// import { useEffect, useState } from "react";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import UserTrackOrderModal from "../components/UserTrackOrderModal";
// import { socket } from "../socket";

// const statusColors = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   Confirmed: "bg-blue-100 text-blue-700",
//   PickedUp: "bg-indigo-100 text-indigo-700",
//   Shipped: "bg-purple-100 text-purple-700",
//   Delivered: "bg-green-100 text-green-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// const paymentColors = {
//   Pending: "bg-orange-100 text-orange-700",
//   Paid: "bg-green-100 text-green-700",
//   Refunded: "bg-blue-100 text-blue-700", // ✅ NEW
// };

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState("");
//   const [trackingOrderId, setTrackingOrderId] = useState("");
//   const [cancelLoading, setCancelLoading] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setPageError("");
//       const { data } = await api.get("/orders/my");

//       if (data?.success) {
//         setOrders(data.orders || []);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load orders");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CANCEL ORDER WITH INSTANT UI UPDATE
//   const cancelOrder = async (orderId) => {
//     const confirm = window.confirm("Kya aap sach mein yeh order cancel karna chahte hain?");
//     if (!confirm) return;

//     try {
//       setCancelLoading(orderId);

//       const { data } = await api.put(`/orders/cancel-order/${orderId}`);

//       if (data?.success) {
//         // ✅ INSTANT UI UPDATE (NO WAIT)
//         setOrders((prev) =>
//           prev.map((o) =>
//             o._id === orderId
//               ? {
//                   ...o,
//                   status: "Cancelled",
//                   paymentStatus:
//                     o.paymentMethod === "Online" ? "Refunded" : o.paymentStatus,
//                 }
//               : o
//           )
//         );
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Cancel failed");
//     } finally {
//       setCancelLoading("");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ✅ SOCKET REALTIME UPDATE
//   useEffect(() => {
//     if (orders.length === 0) return;

//     orders.forEach((order) => {
//       socket.emit("joinOrderRoom", order._id);
//     });

//     const handleOrderUpdate = (updatedData) => {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedData.orderId
//             ? { ...order, ...updatedData }
//             : order
//         )
//       );
//     };

//     socket.on("orderTrackingUpdated", handleOrderUpdate);

//     return () => {
//       orders.forEach((order) => {
//         socket.emit("leaveOrderRoom", order._id);
//       });
//       socket.off("orderTrackingUpdated", handleOrderUpdate);
//     };
//   }, [orders]);

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">

//         {/* HEADER */}
//         <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//           <p className="text-sm text-green-100">Order History</p>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">My Orders</h1>
//         </div>

//         {/* STATES */}
//         {loading && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             Loading orders...
//           </div>
//         )}

//         {!loading && pageError && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-red-600">
//             {pageError}
//           </div>
//         )}

//         {!loading && orders.length === 0 && (
//           <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
//             No orders placed yet
//           </div>
//         )}

//         {/* ORDERS */}
//         {!loading && orders.length > 0 && (
//           <div className="space-y-5 mt-6">
//             {orders.map((order) => {
//               const canTrack = ["PickedUp", "Shipped"].includes(order.status);
//               const canCancel = ["Pending", "Confirmed"].includes(order.status);

//               return (
//                 <div
//                   key={order._id}
//                   className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
//                 >
//                   {/* TOP */}
//                   <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
//                     <div>
//                       <h2 className="font-bold text-gray-800">
//                         Order #{order._id.slice(-6).toUpperCase()}
//                       </h2>
//                       <p className="text-sm text-gray-500">{order.address}</p>
//                     </div>

//                     <div className="flex flex-col items-start sm:items-end gap-2">
//                       <p className="text-green-600 font-bold text-lg">
//                         ₹{order.totalAmount}
//                       </p>

//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
//                           {order.status}
//                         </span>

//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus]}`}>
//                           {order.paymentStatus}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* REFUND MESSAGE */}
//                   {order.paymentStatus === "Refunded" && (
//                     <p className="text-xs text-blue-600 mt-2">
//                       💸 Refund initiated to your original payment method
//                     </p>
//                   )}

//                   {/* ADMIN MESSAGE */}
//                   {order.adminMessage && (
//                     <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-xl">
//                       <p className="text-sm text-blue-800">{order.adminMessage}</p>
//                     </div>
//                   )}

//                   {/* ACTIONS */}
//                   <div className="mt-4 flex flex-wrap gap-3">
//                     {canTrack && (
//                       <button
//                         onClick={() => setTrackingOrderId(order._id)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700"
//                       >
//                         Track Order
//                       </button>
//                     )}

//                     {canCancel && (
//                       <button
//                         onClick={() => cancelOrder(order._id)}
//                         disabled={cancelLoading === order._id}
//                         className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm hover:bg-red-50 disabled:opacity-60"
//                       >
//                         {cancelLoading === order._id ? "Cancelling..." : "Cancel Order"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       <BottomNav />

//       {trackingOrderId && (
//         <UserTrackOrderModal
//           orderId={trackingOrderId}
//           onClose={() => setTrackingOrderId("")}
//         />
//       )}
//     </div>
//   );
// };

// export default MyOrders;






import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import api from "../api/api";
import UserTrackOrderModal from "../components/UserTrackOrderModal";
import { socket } from "../socket";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  PickedUp: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentColors = {
  Pending: "bg-orange-100 text-orange-700",
  Paid: "bg-green-100 text-green-700",
  Refunded: "bg-blue-100 text-blue-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [cancelLoading, setCancelLoading] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setPageError("");
      const { data } = await api.get("/orders/my");

      if (data?.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      setPageError(error?.response?.data?.message || "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL ORDER (FIXED)
  const cancelOrder = async (orderId) => {
    const confirm = window.confirm("Kya aap sach mein yeh order cancel karna chahte hain?");
    if (!confirm) return;

    try {
      setCancelLoading(orderId);

      const { data } = await api.put(`/orders/cancel-order/${orderId}`);

      if (data?.success) {
        // ✅ instant UI update
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId
              ? {
                  ...o,
                  status: "Cancelled",
                  paymentStatus:
                    o.paymentMethod?.toUpperCase() === "ONLINE"
                      ? "Refunded"
                      : o.paymentStatus,
                }
              : o
          )
        );
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Cancel failed");
    } finally {
      setCancelLoading("");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ SOCKET FIXED (paymentStatus merge)
  useEffect(() => {
    if (orders.length === 0) return;

    orders.forEach((order) => {
      socket.emit("joinOrderRoom", order._id);
    });

    const handleOrderUpdate = (updatedData) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedData.orderId
            ? {
                ...order,
                status: updatedData.status || order.status,
                paymentStatus:
                  updatedData.paymentStatus || order.paymentStatus,
              }
            : order
        )
      );
    };

    socket.on("orderTrackingUpdated", handleOrderUpdate);

    return () => {
      orders.forEach((order) => {
        socket.emit("leaveOrderRoom", order._id);
      });
      socket.off("orderTrackingUpdated", handleOrderUpdate);
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
      <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">

        {/* HEADER */}
        <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
          <p className="text-sm text-green-100">Order History</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">My Orders</h1>
        </div>

        {/* STATES */}
        {loading && (
          <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
            Loading orders...
          </div>
        )}

        {!loading && pageError && (
          <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-red-600">
            {pageError}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
            No orders placed yet
          </div>
        )}

        {/* ORDERS */}
        {!loading && orders.length > 0 && (
          <div className="space-y-5 mt-6">
            {orders.map((order) => {
              const canTrack = ["PickedUp", "Shipped"].includes(order.status);
              const canCancel = ["Pending", "Confirmed"].includes(order.status);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
                >
                  {/* TOP */}
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-gray-800">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      <p className="text-sm text-gray-500">{order.address}</p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <p className="text-green-600 font-bold text-lg">
                        ₹{order.totalAmount}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>

                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ REFUND MESSAGE FIXED */}
                  {order.paymentStatus?.toLowerCase() === "refunded" && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">
                      💸 Refund initiated to your original payment method
                    </p>
                  )}

                  {/* ADMIN MESSAGE */}
                  {order.adminMessage && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-xl">
                      <p className="text-sm text-blue-800">{order.adminMessage}</p>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {canTrack && (
                      <button
                        onClick={() => setTrackingOrderId(order._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700"
                      >
                        Track Order
                      </button>
                    )}

                    {canCancel && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={cancelLoading === order._id}
                        className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm hover:bg-red-50 disabled:opacity-60"
                      >
                        {cancelLoading === order._id ? "Cancelling..." : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />

      {trackingOrderId && (
        <UserTrackOrderModal
          orderId={trackingOrderId}
          onClose={() => setTrackingOrderId("")}
        />
      )}
    </div>
  );
};

export default MyOrders;