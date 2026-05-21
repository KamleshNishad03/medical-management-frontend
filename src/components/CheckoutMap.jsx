// import { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import L from "leaflet";

// // Custom simple marker using emoji, so no marker image issue
// const emojiIcon = L.divIcon({
//   html: `<div style="font-size: 28px; line-height: 28px;">📍</div>`,
//   className: "",
//   iconSize: [28, 28],
//   iconAnchor: [14, 28],
//   popupAnchor: [0, -28],
// });

// const DEFAULT_CENTER = [26.8467, 80.9462]; // Lucknow fallback

// function ChangeView({ center, zoom = 15 }) {
//   const map = useMap();

//   useEffect(() => {
//     if (center?.length === 2) {
//       map.setView(center, zoom);
//     }
//   }, [center, zoom, map]);

//   return null;
// }

// function LocationPicker({ selectedLocation, onSelectLocation }) {
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       onSelectLocation(lat, lng);
//     },
//   });

//   if (!selectedLocation) return null;

//   return (
//     <Marker position={selectedLocation} icon={emojiIcon}>
//       <Popup>Selected delivery location</Popup>
//     </Marker>
//   );
// }

// const CheckoutMap = ({ selectedLocation, onSelectLocation }) => {
//   const center = selectedLocation || DEFAULT_CENTER;

//   return (
//     <div className="w-full h-[320px] overflow-hidden rounded-[24px] border border-gray-200">
//       <MapContainer
//         center={center}
//         zoom={selectedLocation ? 15 : 12}
//         scrollWheelZoom={true}
//         style={{ width: "100%", height: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <ChangeView center={center} zoom={selectedLocation ? 15 : 12} />

//         <LocationPicker
//           selectedLocation={selectedLocation}
//           onSelectLocation={onSelectLocation}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default CheckoutMap;



import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const emojiIcon = L.divIcon({
  html: `<div style="font-size: 28px; line-height: 28px;">📍</div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const DEFAULT_CENTER = [26.8467, 80.9462]; // Lucknow fallback

function ChangeView({ center, zoom = 15 }) {
  const map = useMap();

  useEffect(() => {
    if (center?.length === 2) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function LocationPicker({ selectedLocation, onSelectLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelectLocation(lat, lng);
    },
  });

  if (!selectedLocation) return null;

  return (
    <Marker position={selectedLocation} icon={emojiIcon}>
      <Popup>Selected delivery location</Popup>
    </Marker>
  );
}

const CheckoutMap = ({ selectedLocation, onSelectLocation }) => {
  const center = selectedLocation || DEFAULT_CENTER;

  return (
    <div className="w-full h-[320px] overflow-hidden rounded-[24px] border border-gray-200">
      <MapContainer
        center={center}
        zoom={selectedLocation ? 15 : 12}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeView center={center} zoom={selectedLocation ? 15 : 12} />

        <LocationPicker
          selectedLocation={selectedLocation}
          onSelectLocation={onSelectLocation}
        />
      </MapContainer>
    </div>
  );
};

export default CheckoutMap;