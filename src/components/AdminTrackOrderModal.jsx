// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import L from "leaflet";
// import api from "../api/api";

// const currentIcon = L.divIcon({
//   html: `<div style="font-size: 28px;">🚚</div>`,
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

// const AdminTrackOrderModal = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");
//   const [saving, setSaving] = useState(false);

//   const fetchOrder = async () => {
//     try {
//       const { data } = await api.get(`/orders/admin/${orderId}`);
//       if (data?.success) {
//         setOrder(data.order);

//         if (data.order?.currentLocation?.lat && data.order?.currentLocation?.lng) {
//           setLat(String(data.order.currentLocation.lat));
//           setLng(String(data.order.currentLocation.lng));
//         }
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
//     const interval = setInterval(fetchOrder, 5000);
//     return () => clearInterval(interval);
//   }, [orderId]);

//   const handleSaveLocation = async () => {
//     try {
//       if (!lat || !lng) {
//         alert("Latitude and longitude are required");
//         return;
//       }

//       setSaving(true);

//       const { data } = await api.put(`/orders/admin/location/${orderId}`, {
//         lat: Number(lat),
//         lng: Number(lng),
//       });

//       if (data?.success) {
//         await fetchOrder();
//         alert("Tracking location updated");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to update location");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const mapCenter = useMemo(() => {
//     if (order?.currentLocation?.lat && order?.currentLocation?.lng) {
//       return [order.currentLocation.lat, order.currentLocation.lng];
//     }

//     if (order?.location?.lat && order?.location?.lng) {
//       return [order.location.lat, order.location.lng];
//     }

//     return [26.8467, 80.9462];
//   }, [order]);

//   const currentPos =
//     order?.currentLocation?.lat && order?.currentLocation?.lng
//       ? [order.currentLocation.lat, order.currentLocation.lng]
//       : null;

//   const destinationPos =
//     order?.location?.lat && order?.location?.lng
//       ? [order.location.lat, order.location.lng]
//       : null;

//   const polylinePositions =
//     currentPos && destinationPos ? [currentPos, destinationPos] : [];

//   return (
//     <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-5 py-4 border-b">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Track Order</h2>
//             <p className="text-sm text-gray-500">
//               Live tracking for admin side
//             </p>
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
//           <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
//             <div className="h-[420px] lg:h-[520px]">
//               <MapContainer
//                 center={mapCenter}
//                 zoom={14}
//                 scrollWheelZoom={true}
//                 style={{ width: "100%", height: "100%" }}
//               >
//                 <TileLayer
//                   attribution='&copy; OpenStreetMap contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 <ChangeView center={mapCenter} zoom={14} />

//                 {currentPos && (
//                   <Marker position={currentPos} icon={currentIcon}>
//                     <Popup>Current live location</Popup>
//                   </Marker>
//                 )}

//                 {destinationPos && (
//                   <Marker position={destinationPos} icon={destinationIcon}>
//                     <Popup>Delivery destination</Popup>
//                   </Marker>
//                 )}

//                 {polylinePositions.length === 2 && (
//                   <Polyline positions={polylinePositions} />
//                 )}
//               </MapContainer>
//             </div>

//             <div className="p-5">
//               <div className="space-y-4">
//                 <div className="rounded-2xl bg-gray-50 border p-4">
//                   <p className="text-sm text-gray-400">Customer</p>
//                   <p className="font-semibold text-gray-800">
//                     {order?.user?.name || "User"}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {order?.user?.phone || ""}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-gray-50 border p-4">
//                   <p className="text-sm text-gray-400">Current Status</p>
//                   <p className="font-semibold text-gray-800">
//                     {order?.status}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-gray-50 border p-4">
//                   <p className="text-sm text-gray-400">Delivery Address</p>
//                   <p className="font-semibold text-gray-800">
//                     {order?.address || "N/A"}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-gray-50 border p-4">
//                   <p className="text-sm text-gray-400 mb-3">
//                     Update Live Location
//                   </p>

//                   <div className="grid grid-cols-2 gap-3">
//                     <input
//                       type="number"
//                       step="any"
//                       value={lat}
//                       onChange={(e) => setLat(e.target.value)}
//                       placeholder="Latitude"
//                       className="rounded-xl border px-3 py-2"
//                     />
//                     <input
//                       type="number"
//                       step="any"
//                       value={lng}
//                       onChange={(e) => setLng(e.target.value)}
//                       placeholder="Longitude"
//                       className="rounded-xl border px-3 py-2"
//                     />
//                   </div>

//                   <button
//                     onClick={handleSaveLocation}
//                     disabled={saving}
//                     className="w-full mt-3 rounded-xl bg-green-600 text-white py-2.5 font-semibold hover:bg-green-700 disabled:opacity-70"
//                   >
//                     {saving ? "Updating..." : "Update Tracking Location"}
//                   </button>
//                 </div>

//                 {order?.currentLocation?.updatedAt && (
//                   <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
//                     <p className="text-sm text-blue-700 font-medium">
//                       Last updated:
//                     </p>
//                     <p className="text-sm text-blue-600 mt-1">
//                       {new Date(order.currentLocation.updatedAt).toLocaleString()}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminTrackOrderModal;


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

    try {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    } catch (e) {
      routingRef.current = null;
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(startPos[0], startPos[1]),
        L.latLng(destinationPos[0], destinationPos[1]),
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
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
        }
      } catch (e) {}
      routingRef.current = null;

      try {
        if (markerRef.current && map._loaded) {
          map.removeLayer(markerRef.current);
        }
      } catch (e) {}
      markerRef.current = null;
      routeCoordsRef.current = [];
    };
  }, [map, startPos, destinationPos]);

  return null;
}

const AdminTrackOrderModal = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/admin/${orderId}`);
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
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleUseCurrentLocationAsStart = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser");
      return;
    }

    setSaving(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { data } = await api.put(`/orders/admin/start-location/${orderId}`, {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          if (data?.success) {
            await fetchOrder();
            alert("Start location set from current location");
          }
        } catch (error) {
          console.error(error);
          alert(error?.response?.data?.message || "Failed to set start location");
        } finally {
          setSaving(false);
        }
      },
      (error) => {
        console.error(error);
        setSaving(false);
        if (error.code === 1) alert("Location permission denied");
        else if (error.code === 2) alert("Location unavailable");
        else if (error.code === 3) alert("Location request timed out");
        else alert("Failed to get current location");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const changeProgress = async (nextProgress) => {
    try {
      setSaving(true);
      const { data } = await api.put(`/orders/admin/progress/${orderId}`, {
        progress: nextProgress,
      });
      if (data?.success) {
        await fetchOrder();
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to update progress");
    } finally {
      setSaving(false);
    }
  };

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
            <h2 className="text-2xl font-bold text-gray-800">Track Delivery</h2>
            <p className="text-sm text-gray-500">
              Admin current location se road route tracking
            </p>
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
                    <Popup>Admin start location</Popup>
                  </Marker>
                )}

                {destinationPos && (
                  <Marker position={destinationPos} icon={destinationIcon}>
                    <Popup>Customer destination</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            <div className="p-5 space-y-4">
              <div className="rounded-2xl bg-gray-50 border p-4">
                <p className="text-sm text-gray-400">Customer</p>
                <p className="font-semibold text-gray-800">
                  {order?.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500">{order?.address}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 border p-4">
                <p className="text-sm text-gray-400">Order Status</p>
                <p className="font-semibold text-gray-800">{order?.status}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 border p-4">
                <p className="text-sm text-gray-400">Delivery Progress</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {progress}%
                </p>
                <div className="mt-3 w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {!startPos && (
                <button
                  onClick={handleUseCurrentLocationAsStart}
                  disabled={saving}
                  className="w-full rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-70"
                >
                  {saving
                    ? "Getting Current Location..."
                    : "Use My Current Location as Start"}
                </button>
              )}

              {startPos && (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      changeProgress(Math.min((order?.deliveryProgress || 0) + 10, 100))
                    }
                    disabled={saving || order?.deliveryProgress >= 100}
                    className="rounded-xl bg-green-600 text-white py-2.5 font-semibold hover:bg-green-700 disabled:opacity-70"
                  >
                    +10%
                  </button>

                  <button
                    onClick={() =>
                      changeProgress(Math.min((order?.deliveryProgress || 0) + 25, 100))
                    }
                    disabled={saving || order?.deliveryProgress >= 100}
                    className="rounded-xl bg-orange-500 text-white py-2.5 font-semibold hover:bg-orange-600 disabled:opacity-70"
                  >
                    +25%
                  </button>

                  <button
                    onClick={() => changeProgress(100)}
                    disabled={saving || order?.deliveryProgress >= 100}
                    className="rounded-xl bg-purple-600 text-white py-2.5 font-semibold hover:bg-purple-700 disabled:opacity-70"
                  >
                    Complete
                  </button>
                </div>
              )}

              {order?.currentLocation?.updatedAt && (
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                  <p className="text-sm text-blue-700 font-medium">Last moved:</p>
                  <p className="text-sm text-blue-600 mt-1">
                    {new Date(order.currentLocation.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrackOrderModal;