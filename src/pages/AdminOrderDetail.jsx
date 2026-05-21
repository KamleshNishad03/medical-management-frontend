import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import AdminTrackOrderModal from "../components/AdminTrackOrderModal";

const statusFlow = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["PickedUp", "Cancelled"],
  PickedUp: [],
  Shipped: [],
  Delivered: [],
  Cancelled: [],
};

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
};

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [showTrack, setShowTrack] = useState(false);
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/orders/admin/${id}`);
      if (data?.success) {
        setOrder(data.order);
        setMessage(data.order.adminMessage || "");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setActionLoading("status");
      const { data } = await api.put(`/orders/admin/status/${id}`, { status });
      if (data?.success) {
        alert("Status updated");
        fetchOrder();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Update failed");
    } finally {
      setActionLoading("");
    }
  };

  const markPaymentSuccess = async () => {
    try {
      setActionLoading("payment");
      const { data } = await api.put(`/orders/admin/status/${id}`, {
        paymentStatus: "Paid",
      });
      if (data?.success) {
        alert("Payment marked as successful");
        fetchOrder();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Payment update failed");
    } finally {
      setActionLoading("");
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return alert("Kuch likho pehle");
    try {
      setMsgLoading(true);
      const { data } = await api.put(`/orders/admin/message/${id}`, {
        adminMessage: message.trim(),
      });
      if (data?.success) {
        alert("Message sent to user");
        fetchOrder();
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Message send failed");
    } finally {
      setMsgLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[24px] p-8 text-center mt-6 text-gray-500">
        Loading order...
      </div>
    );
  }

  if (!order) return null;

  const nextStatuses = statusFlow[order.status] || [];
  const canMarkCodPaid = order.paymentMethod === "COD" && order.paymentStatus === "Pending";
  const canTrack = ["PickedUp", "Shipped"].includes(order.status);
  const showMessageBox = ["Pending", "Confirmed"].includes(order.status);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
        <button
          onClick={() => navigate("/admin/orders")}
          className="text-sm text-orange-100 hover:text-white mb-2 flex items-center gap-1"
        >
          ← Back to Orders
        </button>
        <p className="text-sm text-orange-100">Order Detail</p>
        <h1 className="text-2xl md:text-4xl font-extrabold mt-1">
          #{order._id.slice(-6).toUpperCase()}
        </h1>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">User Info</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Name:</span> {order.user?.name}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Email:</span> {order.user?.email}
          </p>
          {order.phone && (
            <a
              href={`tel:${order.phone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
            >
              📞 {order.phone}
            </a>
          )}
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Address:</span> {order.address}
          </p>
          {order.city && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">City:</span> {order.city}, {order.state} - {order.pincode}
            </p>
          )}
          {order.landmark && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Landmark:</span> {order.landmark}
            </p>
          )}
        </div>
      </div>

      {/* Order Status + Payment */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Status & Payment</h2>
        <div className="flex flex-wrap gap-3 mb-5">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
            {order.status}
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-700"}`}>
            Payment: {order.paymentStatus}
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
            {order.paymentMethod}
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-50 text-green-700">
            ₹{order.totalAmount}
          </span>
        </div>

        {/* Change Status */}
        {nextStatuses.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {nextStatuses.map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(status)}
                disabled={actionLoading === "status"}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 ${
                  status === "Cancelled"
                    ? "bg-red-50 border border-red-300 text-red-600 hover:bg-red-100"
                    : "bg-blue-50 border border-blue-300 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {actionLoading === "status" ? "Updating..." : `Move to ${status}`}
              </button>
            ))}
          </div>
        )}

        {canMarkCodPaid && (
          <button
            onClick={markPaymentSuccess}
            disabled={actionLoading === "payment"}
            className="rounded-xl bg-green-600 text-white px-5 py-2 text-sm font-semibold hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            {actionLoading === "payment" ? "Updating..." : "Mark Payment Success"}
          </button>
        )}

        {canTrack && (
          <button
            onClick={() => setShowTrack(true)}
            className="ml-3 rounded-xl bg-blue-600 text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Track Order
          </button>
        )}

        {order.deliveryProgress > 0 && order.status !== "Delivered" && (
          <p className="mt-3 text-sm text-gray-600">
            Progress: <span className="font-semibold text-green-600">{order.deliveryProgress}%</span>
          </p>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Items</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-gray-50 border border-gray-100 p-3">
              <p className="font-semibold text-gray-800 text-sm">{item.medicine?.name}</p>
              <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
              <p className="text-xs text-gray-500">Price: ₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Message Box */}
      {showMessageBox && (
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Delivery Time Message</h2>
          <p className="text-xs text-gray-500 mb-4">User ko notification mein dikhega</p>

          {order.adminMessage && (
            <div className="rounded-xl bg-yellow-50 border border-yellow-200 px-3 py-2 text-sm text-gray-700 mb-3">
              <span className="text-xs text-yellow-600 font-medium block mb-0.5">Abhi saved hai:</span>
              {order.adminMessage}
            </div>
          )}

          <textarea
            rows={3}
            placeholder='e.g. "2-3 ghante mein deliver ho jayega" ya "Aaj delivery nahi hogi, kal hogi"'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-yellow-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400 resize-none bg-white"
          />
          <button
            onClick={sendMessage}
            disabled={msgLoading}
            className="mt-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 text-sm font-semibold disabled:opacity-60 transition-colors"
          >
            {msgLoading ? "Sending..." : "Send to User"}
          </button>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Timeline</h2>
        {order.statusHistory?.length > 0 ? (
          <div className="space-y-3">
            {order.statusHistory.map((entry, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm flex-1">
                  <p className="font-semibold text-gray-800">{entry.status}</p>
                  {entry.note && <p className="text-gray-500 mt-0.5">{entry.note}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(entry.changedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No history available</p>
        )}
      </div>

      {showTrack && (
        <AdminTrackOrderModal
          orderId={order._id}
          onClose={() => setShowTrack(false)}
        />
      )}
    </div>
  );
};

export default AdminOrderDetail;