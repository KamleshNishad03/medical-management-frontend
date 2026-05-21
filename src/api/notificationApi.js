import axios from "./axios";

export const getMyNotificationsApi = async () => {
  const { data } = await axios.get("/api/v1/notifications/my");
  return data;
};

export const markNotificationReadApi = async (id) => {
  const { data } = await axios.put(`/api/v1/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsReadApi = async () => {
  const { data } = await axios.put("/api/v1/notifications/read-all");
  return data;
};

export const deleteNotificationApi = async (id) => {
  const { data } = await axios.delete(`/api/v1/notifications/${id}`);
  return data;
};