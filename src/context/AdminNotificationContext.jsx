import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import axios from "../api/axios";

const AdminNotificationContext = createContext();

export const AdminNotificationProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      setAdminUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const fetchAdminNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/notifications/admin");

      if (data?.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Fetch Admin Notifications Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAdminAsRead = async (id) => {
    try {
      const { data } = await axios.put(`/api/v1/notifications/admin/${id}/read`);

      if (data?.success) {
        setNotifications((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isRead: true } : item
          )
        );
        setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } catch (error) {
      console.error("Mark Admin Notification Read Error:", error);
    }
  };

  const markAllAdminAsRead = async () => {
    try {
      const { data } = await axios.put("/api/v1/notifications/admin/read-all");

      if (data?.success) {
        setNotifications((prev) =>
          prev.map((item) => ({ ...item, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Mark All Admin Notifications Read Error:", error);
    }
  };

  const deleteAdminNotification = async (id) => {
    try {
      const target = notifications.find((item) => item._id === id);

      const { data } = await axios.delete(`/api/v1/notifications/admin/${id}`);

      if (data?.success) {
        setNotifications((prev) => prev.filter((item) => item._id !== id));

        if (target && !target.isRead) {
          setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }
    } catch (error) {
      console.error("Delete Admin Notification Error:", error);
    }
  };

  useEffect(() => {
    if (!adminUser?._id || adminUser?.role !== "admin") return;

    fetchAdminNotifications();

    socket.emit("joinAdminRoom");

    const handleNewAdminNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("newAdminNotification", handleNewAdminNotification);

    return () => {
      socket.emit("leaveAdminRoom");
      socket.off("newAdminNotification", handleNewAdminNotification);
    };
  }, [adminUser?._id, adminUser?.role]);

  return (
    <AdminNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchAdminNotifications,
        markAdminAsRead,
        markAllAdminAsRead,
        deleteAdminNotification,
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
};

export const useAdminNotification = () => useContext(AdminNotificationContext);