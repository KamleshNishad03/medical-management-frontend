



// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/api";

// const statusColors = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   Confirmed: "bg-blue-100 text-blue-700",
//   Shipped: "bg-purple-100 text-purple-700",
//   Delivered: "bg-green-100 text-green-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// const Card = ({ title, value, valueClass = "text-gray-800" }) => (
//   <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h2 className={`text-3xl font-extrabold mt-2 ${valueClass}`}>{value}</h2>
//   </div>
// );

// const SummaryRow = ({ label, value }) => (
//   <div className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3">
//     <span className="text-gray-600">{label}</span>
//     <span className="font-bold">{value}</span>
//   </div>
// );

// const AdminDashboard = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setPageError("");
//       const { data } = await api.get("/orders/admin/all");
//       if (data?.success) {
//         setOrders(data.orders || []);
//       } else {
//         setOrders([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load dashboard");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const stats = useMemo(() => {
//     let totalRevenue = 0;
//     let pendingOrders = 0;
//     let deliveredOrders = 0;
//     let cancelledOrders = 0;

//     orders.forEach((order) => {
//       totalRevenue += order.totalAmount || 0;
//       if (order.status === "Pending") pendingOrders++;
//       if (order.status === "Delivered") deliveredOrders++;
//       if (order.status === "Cancelled") cancelledOrders++;
//     });

//     return {
//       totalOrders: orders.length,
//       totalRevenue,
//       pendingOrders,
//       deliveredOrders,
//       cancelledOrders,
//     };
//   }, [orders]);

//   const recentOrders = orders.slice(0, 5);

//   return (
//     <div>
//       <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//         <p className="text-sm text-green-100">Admin Panel</p>
//         <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//           Admin Dashboard
//         </h1>
//         <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
//           Manage orders, revenue and prescriptions.
//         </p>
//       </div>

//       {loading && (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//           Loading dashboard...
//         </div>
//       )}

//       {!loading && pageError && (
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6 text-red-600">
//           {pageError}
//         </div>
//       )}

//       {!loading && !pageError && (
//         <>
//           <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
//             <Card title="Total Orders" value={stats.totalOrders} />
//             <Card
//               title="Total Revenue"
//               value={`₹${stats.totalRevenue}`}
//               valueClass="text-green-600"
//             />
//             <Card
//               title="Pending Orders"
//               value={stats.pendingOrders}
//               valueClass="text-yellow-600"
//             />
//             <Card
//               title="Delivered Orders"
//               value={stats.deliveredOrders}
//               valueClass="text-blue-600"
//             />
//           </section>

//           <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mt-6">
//             <div className="space-y-6">
//               <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
//                 <div className="grid gap-3 mt-5">
//                   <Link
//                     to="/admin/orders"
//                     className="rounded-2xl bg-green-50 border border-green-100 px-4 py-4 font-semibold text-green-700 hover:bg-green-100"
//                   >
//                     Manage Orders
//                   </Link>
//                   <Link
//                     to="/admin/prescriptions"
//                     className="rounded-2xl bg-orange-50 border border-orange-100 px-4 py-4 font-semibold text-orange-700 hover:bg-orange-100"
//                   >
//                     Review Prescriptions
//                   </Link>
//                   <Link
//                     to="/admin/medicines"
//                     className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-4 font-semibold text-blue-700 hover:bg-blue-100"
//                   >
//                     Manage Medicines
//                   </Link>
//                 </div>
//               </div>

//               <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
//                 <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
//                 <div className="space-y-3 mt-5">
//                   <SummaryRow label="Pending" value={stats.pendingOrders} />
//                   <SummaryRow label="Delivered" value={stats.deliveredOrders} />
//                   <SummaryRow label="Cancelled" value={stats.cancelledOrders} />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between gap-3">
//                 <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
//                 <Link
//                   to="/admin/orders"
//                   className="text-sm font-semibold text-green-600 hover:underline"
//                 >
//                   View All
//                 </Link>
//               </div>

//               <div className="space-y-4 mt-5">
//                 {recentOrders.length === 0 ? (
//                   <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500">
//                     No orders found
//                   </div>
//                 ) : (
//                   recentOrders.map((order) => (
//                     <div
//                       key={order._id}
//                       className="rounded-2xl border border-gray-100 p-4"
//                     >
//                       <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
//                         <div>
//                           <p className="font-bold text-gray-800">
//                             {order.user?.name || "User"}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {order.user?.email || "No email"}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             ₹{order.totalAmount}
//                           </p>
//                         </div>

//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
//                             statusColors[order.status] ||
//                             "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {order.status}
//                         </span>
//                       </div>

//                       <div className="mt-3 text-sm text-gray-500">
//                         {order.items?.length || 0} item(s)
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </section>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;




import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Card = ({ title, value, valueClass = "text-gray-800" }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
    <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
    <h2 className={`text-2xl font-extrabold mt-1.5 ${valueClass}`}>{value}</h2>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-bold text-sm">{value}</span>
  </div>
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setPageError("");
      const { data } = await api.get("/orders/admin/all");
      if (data?.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      setPageError(
        error?.response?.data?.message || "Failed to load dashboard"
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    let totalRevenue = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;

    orders.forEach((order) => {
      totalRevenue += order.totalAmount || 0;
      if (order.status === "Pending") pendingOrders++;
      if (order.status === "Delivered") deliveredOrders++;
      if (order.status === "Cancelled") cancelledOrders++;
    });

    return {
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [orders]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-5">

      <div className="rounded-2xl bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-md">
        <p className="text-xs text-green-100 uppercase tracking-widest">Admin Panel</p>
        <h1 className="text-2xl md:text-4xl font-extrabold mt-1">Dashboard</h1>
        <p className="mt-1.5 text-sm text-green-50">
          Manage orders, revenue and prescriptions.
        </p>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
          Loading dashboard...
        </div>
      )}

      {!loading && pageError && (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-red-600 text-sm">
          {pageError}
        </div>
      )}

      {!loading && !pageError && (
        <>
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5">
            <Card title="Total Orders" value={stats.totalOrders} />
            <Card
              title="Revenue"
              value={formatINR(stats.totalRevenue)}
              valueClass="text-green-600"
            />
            <Card
              title="Pending"
              value={stats.pendingOrders}
              valueClass="text-yellow-600"
            />
            <Card
              title="Delivered"
              value={stats.deliveredOrders}
              valueClass="text-blue-600"
            />
          </section>

          <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
                <div className="grid gap-3 mt-4">
                  <Link
                    to="/admin/orders"
                    className="rounded-2xl bg-green-50 border border-green-100 px-4 py-3.5 font-semibold text-sm text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Manage Orders
                  </Link>
                  <Link
                    to="/admin/prescriptions"
                    className="rounded-2xl bg-orange-50 border border-orange-100 px-4 py-3.5 font-semibold text-sm text-orange-700 hover:bg-orange-100 transition-colors"
                  >
                    Review Prescriptions
                  </Link>
                  <Link
                    to="/admin/medicines"
                    className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-3.5 font-semibold text-sm text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    Manage Medicines
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
                <div className="space-y-3 mt-4">
                  <SummaryRow label="Pending" value={stats.pendingOrders} />
                  <SummaryRow label="Delivered" value={stats.deliveredOrders} />
                  <SummaryRow label="Cancelled" value={stats.cancelledOrders} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                <Link
                  to="/admin/orders"
                  className="text-sm font-semibold text-green-600 hover:underline flex-shrink-0"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {recentOrders.length === 0 ? (
                  <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-500 text-sm">
                    No orders found
                  </div>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="rounded-2xl border border-gray-100 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-800 text-sm truncate">
                            {order.user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {order.user?.email || "No email"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatINR(order.totalAmount)} · {order.items?.length || 0} item(s)
                          </p>
                        </div>
                        <span
                          className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;