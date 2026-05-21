

// import { useEffect, useState } from "react";
// import api from "../api/api";
// import AdminTrackOrderModal from "../components/AdminTrackOrderModal";

// const statusFlow = {
//   Pending: ["Confirmed", "Cancelled"],
//   Confirmed: ["PickedUp", "Cancelled"],
//   PickedUp: [],
//   Shipped: [],
//   Delivered: [],
//   Cancelled: [],
// };

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

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState("");
//   const [trackingOrderId, setTrackingOrderId] = useState("");
//   const [openTimeline, setOpenTimeline] = useState(null);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/orders/admin/all");
//       if (data?.success) {
//         setOrders(data.orders || []);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateStatus = async (orderId, status) => {
//     try {
//       setActionLoading(orderId);

//       const { data } = await api.put(`/orders/admin/status/${orderId}`, {
//         status,
//       });

//       if (data?.success) {
//         alert("Status updated");
//         fetchOrders();
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Update failed");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const markPaymentSuccess = async (orderId) => {
//     try {
//       setActionLoading(`payment-${orderId}`);

//       const { data } = await api.put(`/orders/admin/status/${orderId}`, {
//         paymentStatus: "Paid",
//       });

//       if (data?.success) {
//         alert("Payment marked as successful");
//         fetchOrders();
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Payment update failed");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   return (
//     <div>
//       <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
//         <p className="text-sm text-orange-100">Admin Panel</p>
//         <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//           Manage Orders
//         </h1>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//           Loading orders...
//         </div>
//       ) : (
//         <div className="space-y-4 mt-6">
//           {orders.map((order) => {
//             const nextStatuses = statusFlow[order.status] || [];
//             const canMarkCodPaid =
//               order.paymentMethod === "COD" && order.paymentStatus === "Pending";
//             const canTrack = ["PickedUp", "Shipped"].includes(order.status);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100"
//               >
//                 <div className="flex flex-col md:flex-row md:justify-between gap-4">
//                   <div>
//                     <h2 className="font-bold text-lg">
//                       User: {order.user?.name}
//                     </h2>
//                     <p className="text-sm text-gray-500">{order.user?.email}</p>
//                     <p className="text-sm mt-2 text-gray-600">
//                       Address: {order.address}
//                     </p>
//                   </div>

//                   <div className="text-left md:text-right">
//                     <p className="font-bold text-green-600 text-lg">
//                       ₹{order.totalAmount}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {order.paymentMethod}
//                     </p>

//                     <div className="mt-2 flex flex-wrap gap-2 md:justify-end">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           statusColors[order.status] ||
//                           "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {order.status}
//                       </span>

//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           paymentColors[order.paymentStatus] ||
//                           "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         Payment: {order.paymentStatus}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {order.items.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="rounded-2xl bg-gray-50 border border-gray-100 p-3 text-sm"
//                     >
//                       <p className="font-semibold text-gray-800">
//                         {item.medicine?.name}
//                       </p>
//                       <p className="text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
//                   <select
//                     value=""
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         updateStatus(order._id, e.target.value);
//                       }
//                     }}
//                     disabled={
//                       nextStatuses.length === 0 || actionLoading === order._id
//                     }
//                     className="border px-3 py-2 rounded-xl"
//                   >
//                     <option value="">Change Status</option>
//                     {nextStatuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>

//                   <span className="text-sm text-gray-500">
//                     Current: {order.status}
//                   </span>

//                   {canMarkCodPaid && (
//                     <button
//                       onClick={() => markPaymentSuccess(order._id)}
//                       disabled={actionLoading === `payment-${order._id}`}
//                       className="rounded-xl bg-green-600 text-white px-4 py-2 font-medium hover:bg-green-700 disabled:opacity-70"
//                     >
//                       {actionLoading === `payment-${order._id}`
//                         ? "Updating..."
//                         : "Mark Payment Success"}
//                     </button>
//                   )}

//                   {canTrack && (
//                     <button
//                       onClick={() => setTrackingOrderId(order._id)}
//                       className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700"
//                     >
//                       Track
//                     </button>
//                   )}

//                   {order.deliveryProgress > 0 &&
//                     order.status !== "Delivered" && (
//                       <span className="text-sm text-gray-600">
//                         Progress:{" "}
//                         <span className="font-semibold">
//                           {order.deliveryProgress}%
//                         </span>
//                       </span>
//                     )}
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     onClick={() =>
//                       setOpenTimeline(
//                         openTimeline === order._id ? null : order._id
//                       )
//                     }
//                     className="text-sm font-semibold text-blue-600 hover:underline"
//                   >
//                     {openTimeline === order._id
//                       ? "Hide Timeline ▲"
//                       : "View Timeline ▼"}
//                   </button>

//                   {openTimeline === order._id && (
//                     <div className="mt-3 space-y-2">
//                       {order.statusHistory?.length > 0 ? (
//                         order.statusHistory.map((entry, index) => (
//                           <div
//                             key={index}
//                             className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm"
//                           >
//                             <p className="font-medium text-gray-800">
//                               {entry.status}
//                             </p>
//                             <p className="text-gray-500">{entry.note}</p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               {new Date(entry.changedAt).toLocaleString()}
//                             </p>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-500">
//                           No history available
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {trackingOrderId && (
//         <AdminTrackOrderModal
//           orderId={trackingOrderId}
//           onClose={() => setTrackingOrderId("")}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminOrders;









// import { useEffect, useState } from "react";
// import api from "../api/api";
// import AdminTrackOrderModal from "../components/AdminTrackOrderModal";

// const statusFlow = {
//   Pending: ["Confirmed", "Cancelled"],
//   Confirmed: ["PickedUp", "Cancelled"],
//   PickedUp: [],
//   Shipped: [],
//   Delivered: [],
//   Cancelled: [],
// };

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

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState("");
//   const [trackingOrderId, setTrackingOrderId] = useState("");
//   const [openTimeline, setOpenTimeline] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [msgLoading, setMsgLoading] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/orders/admin/all");
//       if (data?.success) {
//         const fetched = data.orders || [];
//         setOrders(fetched);
//         const prefilled = {};
//         fetched.forEach((o) => {
//           prefilled[o._id] = o.adminMessage || "";
//         });
//         setMessages(prefilled);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateStatus = async (orderId, status) => {
//     try {
//       setActionLoading(orderId);
//       const { data } = await api.put(`/orders/admin/status/${orderId}`, { status });
//       if (data?.success) {
//         alert("Status updated");
//         fetchOrders();
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Update failed");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const markPaymentSuccess = async (orderId) => {
//     try {
//       setActionLoading(`payment-${orderId}`);
//       const { data } = await api.put(`/orders/admin/status/${orderId}`, {
//         paymentStatus: "Paid",
//       });
//       if (data?.success) {
//         alert("Payment marked as successful");
//         fetchOrders();
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Payment update failed");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const sendAdminMessage = async (orderId) => {
//     const msg = messages[orderId]?.trim();
//     if (!msg) return alert("Kuch likho pehle");
//     try {
//       setMsgLoading(orderId);
//       const { data } = await api.put(`/orders/admin/message/${orderId}`, {
//         adminMessage: msg,
//       });
//       if (data?.success) {
//         alert("Message sent to user");
//         fetchOrders();
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Message send failed");
//     } finally {
//       setMsgLoading("");
//     }
//   };

//   return (
//     <div>
//       <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
//         <p className="text-sm text-orange-100">Admin Panel</p>
//         <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//           Manage Orders
//         </h1>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//           Loading orders...
//         </div>
//       ) : (
//         <div className="space-y-4 mt-6">
//           {orders.map((order) => {
//             const nextStatuses = statusFlow[order.status] || [];
//             const canMarkCodPaid =
//               order.paymentMethod === "COD" && order.paymentStatus === "Pending";
//             const canTrack = ["PickedUp", "Shipped"].includes(order.status);
//             const showMessageBox = ["Pending", "Confirmed"].includes(order.status);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100"
//               >
//                 <div className="flex flex-col md:flex-row md:justify-between gap-4">
//                   <div>
//                     <h2 className="font-bold text-lg">User: {order.user?.name}</h2>
//                     <p className="text-sm text-gray-500">{order.user?.email}</p>
//                     <p className="text-sm mt-1 text-gray-600">Address: {order.address}</p>

//                     {/* Phone — tap to call */}
//                     {order.phone && (
//                       <a
//                         href={`tel:${order.phone}`}
//                         className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
//                       >
//                         📞 {order.phone}
//                       </a>
//                     )}
//                   </div>

//                   <div className="text-left md:text-right">
//                     <p className="font-bold text-green-600 text-lg">₹{order.totalAmount}</p>
//                     <p className="text-sm text-gray-500">{order.paymentMethod}</p>
//                     <div className="mt-2 flex flex-wrap gap-2 md:justify-end">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
//                         {order.status}
//                       </span>
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
//                         Payment: {order.paymentStatus}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {order.items.map((item, idx) => (
//                     <div key={idx} className="rounded-2xl bg-gray-50 border border-gray-100 p-3 text-sm">
//                       <p className="font-semibold text-gray-800">{item.medicine?.name}</p>
//                       <p className="text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Delivery Message Box — sirf Pending aur Confirmed pe */}
//                 {showMessageBox && (
//                   <div className="mt-4 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 space-y-3">
//                     <p className="text-sm font-semibold text-yellow-800">
//                       Delivery Time Message (User ko dikhega)
//                     </p>

//                     {order.adminMessage && (
//                       <div className="rounded-xl bg-white border border-yellow-200 px-3 py-2 text-sm text-gray-700">
//                         <span className="text-xs text-yellow-600 font-medium block mb-0.5">
//                           Abhi saved hai:
//                         </span>
//                         {order.adminMessage}
//                       </div>
//                     )}

//                     <textarea
//                       rows={2}
//                       placeholder='e.g. "2-3 ghante mein deliver ho jayega" ya "Aaj delivery nahi hogi, kal hogi"'
//                       value={messages[order._id] || ""}
//                       onChange={(e) =>
//                         setMessages((prev) => ({ ...prev, [order._id]: e.target.value }))
//                       }
//                       className="w-full border border-yellow-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400 resize-none bg-white"
//                     />

//                     <button
//                       onClick={() => sendAdminMessage(order._id)}
//                       disabled={msgLoading === order._id}
//                       className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 text-sm font-semibold disabled:opacity-60 transition-colors"
//                     >
//                       {msgLoading === order._id ? "Sending..." : "Send to User"}
//                     </button>
//                   </div>
//                 )}

//                 <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
//                   <select
//                     value=""
//                     onChange={(e) => { if (e.target.value) updateStatus(order._id, e.target.value); }}
//                     disabled={nextStatuses.length === 0 || actionLoading === order._id}
//                     className="border px-3 py-2 rounded-xl"
//                   >
//                     <option value="">Change Status</option>
//                     {nextStatuses.map((status) => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>

//                   <span className="text-sm text-gray-500">Current: {order.status}</span>

//                   {canMarkCodPaid && (
//                     <button
//                       onClick={() => markPaymentSuccess(order._id)}
//                       disabled={actionLoading === `payment-${order._id}`}
//                       className="rounded-xl bg-green-600 text-white px-4 py-2 font-medium hover:bg-green-700 disabled:opacity-70"
//                     >
//                       {actionLoading === `payment-${order._id}` ? "Updating..." : "Mark Payment Success"}
//                     </button>
//                   )}

//                   {canTrack && (
//                     <button
//                       onClick={() => setTrackingOrderId(order._id)}
//                       className="rounded-xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700"
//                     >
//                       Track
//                     </button>
//                   )}

//                   {order.deliveryProgress > 0 && order.status !== "Delivered" && (
//                     <span className="text-sm text-gray-600">
//                       Progress: <span className="font-semibold">{order.deliveryProgress}%</span>
//                     </span>
//                   )}
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     onClick={() => setOpenTimeline(openTimeline === order._id ? null : order._id)}
//                     className="text-sm font-semibold text-blue-600 hover:underline"
//                   >
//                     {openTimeline === order._id ? "Hide Timeline ▲" : "View Timeline ▼"}
//                   </button>

//                   {openTimeline === order._id && (
//                     <div className="mt-3 space-y-2">
//                       {order.statusHistory?.length > 0 ? (
//                         order.statusHistory.map((entry, index) => (
//                           <div key={index} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm">
//                             <p className="font-medium text-gray-800">{entry.status}</p>
//                             <p className="text-gray-500">{entry.note}</p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               {new Date(entry.changedAt).toLocaleString()}
//                             </p>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-sm text-gray-500">No history available</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {trackingOrderId && (
//         <AdminTrackOrderModal
//           orderId={trackingOrderId}
//           onClose={() => setTrackingOrderId("")}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminOrders;




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/api";

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

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/orders/admin/all");
//       if (data?.success) {
//         setOrders(data.orders || []);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
//         <p className="text-sm text-orange-100">Admin Panel</p>
//         <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Manage Orders</h1>
//         <p className="text-sm text-orange-100 mt-1">{orders.length} total orders</p>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6 text-gray-500">
//           Loading orders...
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6 text-gray-500">
//           No orders yet
//         </div>
//       ) : (
//         <div className="space-y-3 mt-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//             >
//               {/* Left — summary */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <h2 className="font-bold text-gray-800">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </h2>
//                   <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
//                     {order.status}
//                   </span>
//                   <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-700 mt-1 font-medium">{order.user?.name}</p>
//                 <p className="text-xs text-gray-400 truncate">{order.user?.email}</p>

//                 <div className="flex items-center gap-3 mt-1.5">
//                   <span className="text-sm font-bold text-green-600">₹{order.totalAmount}</span>
//                   <span className="text-xs text-gray-400">{order.paymentMethod}</span>
//                   <span className="text-xs text-gray-400">{order.items?.length} item(s)</span>
//                 </div>

//                 {/* Admin message indicator */}
//                 {order.adminMessage && (
//                   <p className="text-xs text-yellow-600 mt-1">
//                     💬 Message sent
//                   </p>
//                 )}
//               </div>

//               {/* Right — action */}
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 {order.phone && (
//                   <a
//                     href={`tel:${order.phone}`}
//                     className="p-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-lg hover:bg-green-100 transition-colors"
//                     title={order.phone}
//                   >
//                     📞
//                   </a>
//                 )}
//                 <button
//                   onClick={() => navigate(`/admin/orders/${order._id}`)}
//                   className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

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
  Refunded: "bg-emerald-100 text-emerald-700", // ✅ NEW
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders/admin/all");
      if (data?.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
        <p className="text-sm text-orange-100">Admin Panel</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Manage Orders</h1>
        <p className="text-sm text-orange-100 mt-1">{orders.length} total orders</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6 text-gray-500">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6 text-gray-500">
          No orders yet
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Left — summary */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-gray-800">
                    #{order._id.slice(-6).toUpperCase()}
                  </h2>

                  {/* STATUS */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                    {order.status}
                  </span>

                  {/* PAYMENT */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
                    {order.paymentStatus}
                  </span>

                  {/* 🔥 REFUND BADGE */}
                  {order.paymentMethod === "ONLINE" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {order.paymentStatus === "Refunded"
                        ? "Refunded ✅"
                        : order.paymentStatus === "Paid"
                        ? "Refund Pending"
                        : "Not Paid"}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-700 mt-1 font-medium">{order.user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{order.user?.email}</p>

                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-sm font-bold text-green-600">₹{order.totalAmount}</span>
                  <span className="text-xs text-gray-400">{order.paymentMethod}</span>
                  <span className="text-xs text-gray-400">{order.items?.length} item(s)</span>
                </div>

                {/* Admin message indicator */}
                {order.adminMessage && (
                  <p className="text-xs text-yellow-600 mt-1">
                    💬 Message sent
                  </p>
                )}
              </div>

              {/* Right — action */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {order.phone && (
                  <a
                    href={`tel:${order.phone}`}
                    className="p-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-lg hover:bg-green-100 transition-colors"
                    title={order.phone}
                  >
                    📞
                  </a>
                )}

                {/* 🔥 CANCEL BUTTON (NEW) */}
                {["Pending", "Confirmed"].includes(order.status) && (
                  <button
                    onClick={async () => {
                      const confirmCancel = window.confirm(
                        "Cancel order? Refund will be auto processed if paid."
                      );
                      if (!confirmCancel) return;

                      try {
                        await api.put(`/orders/admin/update/${order._id}`, {
                          status: "Cancelled",
                        });
                        fetchOrders();
                      } catch (err) {
                        alert("Cancel failed");
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;