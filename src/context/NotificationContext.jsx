import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import {
  getMyNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
  deleteNotificationApi,
} from "../api/notificationApi";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await getMyNotificationsApi();

      if (res?.success) {
        setNotifications(res.notifications || []);
        setUnreadCount(res.unreadCount || 0);
      }
    } catch (error) {
      console.error("Fetch Notifications Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await markNotificationReadApi(id);

      if (res?.success) {
        setNotifications((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isRead: true } : item
          )
        );

        setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } catch (error) {
      console.error("Mark As Read Error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await markAllNotificationsReadApi();

      if (res?.success) {
        setNotifications((prev) =>
          prev.map((item) => ({ ...item, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Mark All As Read Error:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const target = notifications.find((item) => item._id === id);
      const res = await deleteNotificationApi(id);

      if (res?.success) {
        setNotifications((prev) => prev.filter((item) => item._id !== id));

        if (target && !target.isRead) {
          setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }
    } catch (error) {
      console.error("Delete Notification Error:", error);
    }
  };

  useEffect(() => {
    if (!user?._id || user?.role === "admin") return;

    fetchNotifications();

    socket.emit("joinUserRoom", user._id);

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.emit("leaveUserRoom", user._id);
      socket.off("newNotification", handleNewNotification);
    };
  }, [user?._id, user?.role]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);