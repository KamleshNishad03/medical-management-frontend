import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  if (loading) {
    return <p className="p-5">Loading notifications...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      
      {/* 🔙 Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-xl md:text-2xl font-bold">
          Notifications
        </h2>

        <button
          onClick={markAllAsRead}
          className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
        >
          Mark All
        </button>
      </div>

      {/* 📭 Empty */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No notifications found
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id}
            className={`rounded-2xl p-4 mb-3 shadow-sm border ${
              item.isRead ? "bg-white" : "bg-green-50"
            }`}
          >
            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-gray-600 text-sm mt-1">
              {item.message}
            </p>

            <small className="block text-gray-400 mt-2">
              {new Date(item.createdAt).toLocaleString()}
            </small>

            <div className="flex gap-2 mt-3 flex-wrap">
              {!item.isRead && (
                <button
                  onClick={() => markAsRead(item._id)}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(item._id)}
                className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;