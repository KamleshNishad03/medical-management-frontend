// import { io } from "socket.io-client";

// const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export const socket = io(URL, {
//   transports: ["websocket"],
// });

import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

// export default socket;