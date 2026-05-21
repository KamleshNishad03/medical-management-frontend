import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

const NotificationDropdown = ({ closeDropdown }) => {
  const navigate = useNavigate();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  const handleOpen = async (item) => {
    if (!item.isRead) {
      await markAsRead(item._id);
    }

    closeDropdown();

    if (item.order?._id) {
      navigate("/my-orders");
    } else {
      navigate("/notifications");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "420px",
        overflowY: "auto",
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          padding: "12px",
          borderBottom: "1px solid #f1f1f1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 1,
        }}
      >
        <strong>Notifications</strong>
        <button
          onClick={markAllAsRead}
          style={{
            border: "none",
            background: "transparent",
            color: "#0a8f5a",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Mark all read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p style={{ padding: "14px", margin: 0 }}>No notifications yet.</p>
      ) : (
        notifications.slice(0, 8).map((item) => (
          <div
            key={item._id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #f5f5f5",
              background: item.isRead ? "#fff" : "#f0fff6",
            }}
          >
            <div onClick={() => handleOpen(item)} style={{ cursor: "pointer" }}>
              <h4
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "15px",
                  wordBreak: "break-word",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "13px",
                  color: "#555",
                  wordBreak: "break-word",
                }}
              >
                {item.message}
              </p>
              <small style={{ color: "#888" }}>
                {new Date(item.createdAt).toLocaleString()}
              </small>
            </div>

            <button
              onClick={() => deleteNotification(item._id)}
              style={{
                marginTop: "8px",
                border: "none",
                background: "#ffefef",
                color: "#c0392b",
                padding: "5px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <div style={{ padding: "10px", textAlign: "center" }}>
        <button
          onClick={() => {
            closeDropdown();
            navigate("/notifications");
          }}
          style={{
            border: "none",
            background: "#f7941d",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;