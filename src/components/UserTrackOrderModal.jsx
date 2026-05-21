



// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import api from "../api/api";
// import { socket } from "../socket"; // 👈 ADD THIS

// const currentIcon = L.divIcon({
//   html: `<div style="font-size: 28px;">🚚</div>`,
//   className: "",
//   iconSize: [28, 28],
//   iconAnchor: [14, 28],
// });

// const startIcon = L.divIcon({
//   html: `<div style="font-size: 28px;">🧑‍⚕️</div>`,
//   className: "",
//   iconSize: [28, 28],
//   iconAnchor: [14, 28],
// });

// const destinationIcon = L.divIcon({
//   html: `<div style="font-size: 28px;">📍</div>`,
//   className: "",
//   iconSize: [28, 28],
//   iconAnchor: [14, 28],
// });

// function ChangeView({ center, zoom = 14 }) {
//   const map = useMap();

//   useEffect(() => {
//     if (center?.length === 2) {
//       map.setView(center, zoom);
//     }
//   }, [center, zoom, map]);

//   return null;
// }

// function RoutingMachine({ startPos, destinationPos }) {
//   const map = useMap();
//   const routingRef = useRef(null);

//   useEffect(() => {
//     if (!map || !startPos || !destinationPos) return;

//     if (routingRef.current) {
//       map.removeControl(routingRef.current);
//       routingRef.current = null;
//     }

//     routingRef.current = L.Routing.control({
//       waypoints: [
//         L.latLng(startPos[0], startPos[1]),
//         L.latLng(destinationPos[0], destinationPos[1]),
//       ],
//       routeWhileDragging: false,
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//       lineOptions: {
//         styles: [{ color: "#16a34a", weight: 5, opacity: 0.85 }],
//       },
//     }).addTo(map);

//     return () => {
//       if (routingRef.current) {
//         map.removeControl(routingRef.current);
//         routingRef.current = null;
//       }
//     };
//   }, [map, startPos, destinationPos]);

//   return null;
// }

// const UserTrackOrderModal = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // INITIAL FETCH (only once)
//   const fetchOrder = async () => {
//     try {
//       const { data } = await api.get(`/orders/${orderId}`);
//       if (data?.success) {
//         setOrder(data.order);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to load tracking");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();

//     // 👇 JOIN ROOM
//     socket.emit("joinOrderRoom", orderId);

//     // 👇 LISTEN REAL-TIME UPDATES
//     const handleUpdate = (updatedData) => {
//       if (updatedData?.orderId === orderId) {
//         setOrder((prev) => ({
//           ...prev,
//           ...updatedData,
//         }));
//       }
//     };

//     socket.on("orderTrackingUpdated", handleUpdate);

//     return () => {
//       socket.emit("leaveOrderRoom", orderId);
//       socket.off("orderTrackingUpdated", handleUpdate);
//     };
//   }, [orderId]);

//   const center = useMemo(() => {
//     if (order?.currentLocation?.lat != null && order?.currentLocation?.lng != null) {
//       return [order.currentLocation.lat, order.currentLocation.lng];
//     }
//     if (order?.location?.lat != null && order?.location?.lng != null) {
//       return [order.location.lat, order.location.lng];
//     }
//     return [26.8467, 80.9462];
//   }, [order]);

//   const startPos =
//     order?.startLocation?.lat != null && order?.startLocation?.lng != null
//       ? [order.startLocation.lat, order.startLocation.lng]
//       : null;

//   const currentPos =
//     order?.currentLocation?.lat != null && order?.currentLocation?.lng != null
//       ? [order.currentLocation.lat, order.currentLocation.lng]
//       : null;

//   const destinationPos =
//     order?.location?.lat != null && order?.location?.lng != null
//       ? [order.location.lat, order.location.lng]
//       : null;

//   return (
//     <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl bg-white rounded-[28px] shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-5 py-4 border-b">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Track Order</h2>
//             <p className="text-sm text-gray-500">Live delivery progress</p>
//           </div>

//           <button
//             onClick={onClose}
//             className="w-10 h-10 rounded-full border text-xl font-bold"
//           >
//             ×
//           </button>
//         </div>

//         {loading ? (
//           <div className="p-8 text-center">Loading tracking map...</div>
//         ) : (
//           <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            
//             {/* MAP */}
//             <div className="h-[420px] lg:h-[560px]">
//               <MapContainer
//                 center={center}
//                 zoom={14}
//                 scrollWheelZoom={true}
//                 style={{ width: "100%", height: "100%" }}
//               >
//                 <TileLayer
//                   attribution="&copy; OpenStreetMap contributors"
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 <ChangeView center={center} zoom={14} />

//                 {startPos && destinationPos && (
//                   <RoutingMachine
//                     startPos={startPos}
//                     destinationPos={destinationPos}
//                   />
//                 )}

//                 {startPos && (
//                   <Marker position={startPos} icon={startIcon}>
//                     <Popup>Start Location</Popup>
//                   </Marker>
//                 )}

//                 {currentPos && (
//                   <Marker position={currentPos} icon={currentIcon}>
//                     <Popup>Live Delivery Position</Popup>
//                   </Marker>
//                 )}

//                 {destinationPos && (
//                   <Marker position={destinationPos} icon={destinationIcon}>
//                     <Popup>Delivery Destination</Popup>
//                   </Marker>
//                 )}
//               </MapContainer>
//             </div>

//             {/* INFO PANEL */}
//             <div className="p-5 space-y-4">
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p>Status</p>
//                 <p className="font-bold">{order?.status}</p>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p>Progress</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {order?.deliveryProgress || 0}%
//                 </p>
//               </div>

//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p>Address</p>
//                 <p>{order?.address}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserTrackOrderModal;





import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import api from "../api/api";
import { socket } from "../socket";

const currentIcon = L.divIcon({
  html: `<div style="font-size: 28px;">🚚</div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const startIcon = L.divIcon({
  html: `<div style="font-size: 28px;">🧑‍⚕️</div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const destinationIcon = L.divIcon({
  html: `<div style="font-size: 28px;">📍</div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function ChangeView({ center, zoom = 14 }) {
  const map = useMap();
  useEffect(() => {
    if (center?.length === 2) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

function RoutingMachine({ startPos, destinationPos, progress }) {
  const map = useMap();
  const routingRef = useRef(null);
  const markerRef = useRef(null);
  const routeCoordsRef = useRef([]);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
    moveMarker(progress);
  }, [progress]);

  const moveMarker = (pct) => {
    const coords = routeCoordsRef.current;
    if (!coords.length || !markerRef.current) return;
    const p = Math.min(Math.max(pct || 0, 0), 100);
    const index = Math.floor((p / 100) * (coords.length - 1));
    const pos = coords[index];
    if (pos) {
      markerRef.current.setLatLng([pos.lat, pos.lng]);
    }
  };

  useEffect(() => {
    if (!map || !startPos || !destinationPos) return;

    if (routingRef.current) {
      try {
        map.removeControl(routingRef.current);
      } catch (e) {}
      routingRef.current = null;
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(startPos[0], startPos[1]),
        L.latLng(destinationPos[0], destinationPos[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [{ color: "#16a34a", weight: 5, opacity: 0.85 }],
      },
    }).addTo(map);

    routingRef.current.on("routesfound", (e) => {
      const coords = e.routes[0].coordinates;
      routeCoordsRef.current = coords;

      if (!markerRef.current) {
        markerRef.current = L.marker(
          [coords[0].lat, coords[0].lng],
          { icon: currentIcon }
        ).addTo(map);
      }

      moveMarker(progressRef.current);
    });

    // ✅ FIXED CLEANUP
    return () => {
      try {
        if (routingRef.current) {
          map.removeControl(routingRef.current);
          routingRef.current = null;
        }
        if (markerRef.current && map._loaded) {
          map.removeLayer(markerRef.current);
          markerRef.current = null;
        }
      } catch (e) {
        routingRef.current = null;
        markerRef.current = null;
      }
    };
  }, [map, startPos, destinationPos]);

  return null;
}

const UserTrackOrderModal = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      if (data?.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to load tracking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    socket.emit("joinOrderRoom", orderId);

    const handleUpdate = (updatedData) => {
      if (updatedData?.orderId === orderId) {
        setOrder((prev) => ({ ...prev, ...updatedData }));
      }
    };

    socket.on("orderTrackingUpdated", handleUpdate);

    return () => {
      socket.emit("leaveOrderRoom", orderId);
      socket.off("orderTrackingUpdated", handleUpdate);
    };
  }, [orderId]);

  const center = useMemo(() => {
    if (order?.startLocation?.lat != null && order?.startLocation?.lng != null) {
      return [order.startLocation.lat, order.startLocation.lng];
    }
    if (order?.location?.lat != null && order?.location?.lng != null) {
      return [order.location.lat, order.location.lng];
    }
    return [26.8467, 80.9462];
  }, [order]);

  const startPos =
    order?.startLocation?.lat != null && order?.startLocation?.lng != null
      ? [order.startLocation.lat, order.startLocation.lng]
      : null;

  const destinationPos =
    order?.location?.lat != null && order?.location?.lng != null
      ? [order.location.lat, order.location.lng]
      : null;

  const progress = order?.deliveryProgress || 0;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-[28px] shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Track Order</h2>
            <p className="text-sm text-gray-500">Live delivery progress</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border text-xl font-bold"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">Loading tracking map...</div>
        ) : (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            <div className="h-[420px] lg:h-[560px]">
              <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ChangeView center={center} zoom={14} />

                {startPos && destinationPos && (
                  <RoutingMachine
                    startPos={startPos}
                    destinationPos={destinationPos}
                    progress={progress}
                  />
                )}

                {startPos && (
                  <Marker position={startPos} icon={startIcon}>
                    <Popup>Start Location</Popup>
                  </Marker>
                )}

                {destinationPos && (
                  <Marker position={destinationPos} icon={destinationIcon}>
                    <Popup>Delivery Destination</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-bold text-gray-800">{order?.status}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-green-600">{progress}%</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-800">{order?.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTrackOrderModal;