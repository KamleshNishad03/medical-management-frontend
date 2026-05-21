





// import { useEffect, useMemo, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import fallbackMedicine from "../assets/fallback.jpeg";
// import medicineBg from "../assets/bgimage2.avif";

// const filterOptions = [
//   "All","Tablet","Syrup","Capsule","Pain","Fever","Cold",
//   "Vitamins","Diabetes","Heart","Skin",
// ];

// // ✅ FIXED IMAGE FUNCTION
// const getImageUrl = (imgPath) => {
//   if (!imgPath) return fallbackMedicine;

//   // ❌ block broken placeholder URLs
//   if (imgPath.includes("via.placeholder.com")) {
//     return fallbackMedicine;
//   }

//   if (imgPath.startsWith("http")) return imgPath;

//   return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
// };

// const MedicineCard = ({ medicine, onAddToCart }) => {
//   // ✅ FILTER INVALID IMAGES
//   const safeImages =
//     Array.isArray(medicine.images) && medicine.images.length > 0
//       ? medicine.images.filter(
//           (img) => img && !img.includes("via.placeholder.com")
//         )
//       : medicine.image && !medicine.image.includes("via.placeholder.com")
//       ? [medicine.image]
//       : [fallbackMedicine];

//   const [activeImage, setActiveImage] = useState(0);
//   const [adding, setAdding] = useState(false);

//   const nextImage = () => {
//     setActiveImage((prev) =>
//       prev === safeImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevImage = () => {
//     setActiveImage((prev) =>
//       prev === 0 ? safeImages.length - 1 : prev - 1
//     );
//   };

//   const handleAdd = async () => {
//     try {
//       setAdding(true);
//       await onAddToCart(medicine._id);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="bg-white/75 backdrop-blur-md rounded-[24px] p-4 shadow-lg hover:shadow-2xl transition border border-white/40">
//       <div className="relative">
//         <img
//           src={getImageUrl(safeImages[activeImage])}
//           alt={medicine.name}
//           className="w-full h-44 object-cover rounded-[18px]"
//           onError={(e) => (e.target.src = fallbackMedicine)}
//         />

//         {safeImages.length > 1 && (
//           <>
//             <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow">
//               ‹
//             </button>
//             <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow">
//               ›
//             </button>
//           </>
//         )}

//         <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
//           {medicine.type}
//         </div>
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-bold">{medicine.name}</h3>
//         <p className="text-sm text-gray-600">
//           {medicine.description || "No description"}
//         </p>

//         <div className="mt-3 flex justify-between">
//           <div>
//             <p className="text-xs text-gray-500">Category</p>
//             <p>{medicine.category || "General"}</p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-500">Price</p>
//             <p className="text-green-600 font-bold">
//               ₹{medicine.price}
//             </p>
//           </div>
//         </div>

//         <div className="mt-4 flex gap-2">
//           <Link
//             to={`/medicines/${medicine._id}`}
//             className="flex-1 border border-green-600 text-green-600 py-2 text-center rounded-full"
//           >
//             View
//           </Link>

//           <button
//             onClick={handleAdd}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-full"
//           >
//             {adding ? "Adding..." : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Medicines = ({ openLoginModal }) => {
//   const location = useLocation();

//   const [search, setSearch] = useState("");
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const { data } = await api.get("/medicines/all");
//       setMedicines(data.medicines || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       openLoginModal?.();
//       return;
//     }

//     await api.post("/cart/add", { medicineId: id, quantity: 1 });
//     alert("Added to cart");
//   };

//   const filteredMedicines = useMemo(() => {
//     return medicines.filter((m) => {
//       if (activeFilter === "All") return true;
//       return (
//         m.type?.toLowerCase() === activeFilter.toLowerCase() ||
//         m.category?.toLowerCase() === activeFilter.toLowerCase()
//       );
//     });
//   }, [medicines, activeFilter]);

//   return (
//     <div
//       className="min-h-screen pb-20 bg-cover bg-center"
//       // style={{ backgroundImage: `url(${medicineBg})` }}
//     >
//       <div className="p-4">
//         <input
//           placeholder="Search..."
//           className="w-full p-2 rounded mb-4"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="flex gap-2 overflow-x-auto mb-4">
//           {filterOptions.map((f) => (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`px-3 py-1 rounded ${
//                 activeFilter === f ? "bg-orange-500 text-white" : "bg-white"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredMedicines.map((m) => (
//               <MedicineCard
//                 key={m._id}
//                 medicine={m}
//                 onAddToCart={handleAddToCart}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <BottomNav />
//     </div>
//   );
// };

// export default Medicines;

import { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import api from "../api/api";
import fallbackMedicine from "../assets/fallback.jpeg";

const filterOptions = [
  "All","Tablet","Syrup","Capsule","Pain","Fever","Cold",
  "Vitamins","Diabetes","Heart","Skin",
];

const getImageUrl = (imgPath) => {
  if (!imgPath) return fallbackMedicine;
  if (imgPath.includes("via.placeholder.com")) return fallbackMedicine;
  if (imgPath.startsWith("http")) return imgPath;
  return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
};

const MedicineCard = ({ medicine, onAddToCart }) => {
  const safeImages =
    Array.isArray(medicine.images) && medicine.images.length > 0
      ? medicine.images.filter(
          (img) => img && !img.includes("via.placeholder.com")
        )
      : medicine.image && !medicine.image.includes("via.placeholder.com")
      ? [medicine.image]
      : [fallbackMedicine];

  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);

  const nextImage = () => {
    setActiveImage((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const handleAdd = async () => {
    try {
      setAdding(true);
      await onAddToCart(medicine._id);
    } finally {
      setAdding(false);
    }
  };

  const discountedPrice = medicine.offer
    ? Math.round(medicine.mrp - (medicine.mrp * medicine.offer) / 100)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative bg-gray-50">
        <img
          src={getImageUrl(safeImages[activeImage])}
          alt={medicine.name}
          className="w-full h-36 object-cover"
          onError={(e) => (e.target.src = fallbackMedicine)}
        />

        {safeImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full shadow text-xs"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full shadow text-xs"
            >
              ›
            </button>
          </>
        )}

        {medicine.offer ? (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
            {medicine.offer}% OFF
          </div>
        ) : null}

        <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded">
          {medicine.type}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-2.5 flex flex-col flex-1">
        
        <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
          {medicine.name}
        </h3>

        <p className="text-[11px] text-gray-400 mt-0.5">
          {medicine.category || "General"}
        </p>

        {/* PRICE */}
        <div className="mt-1.5">
          {medicine.offer ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-gray-900">
                  ₹{discountedPrice}
                </span>
                <span className="text-[11px] text-green-600 font-semibold">
                  {medicine.offer}% off
                </span>
              </div>
              <span className="text-[11px] text-gray-400 line-through">
                MRP ₹{medicine.mrp}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-900">
              ₹{medicine.mrp}
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="mt-auto pt-2.5 flex gap-1.5">
          <Link
            to={`/medicines/${medicine._id}`}
            className="flex-1 border border-green-600 text-green-600 py-1.5 text-center rounded-lg text-xs font-medium"
          >
            View
          </Link>
          <button
            onClick={handleAdd}
            disabled={adding}
            className="flex-1 bg-orange-500 text-white py-1.5 rounded-lg text-xs font-medium disabled:opacity-70"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Medicines = ({ openLoginModal }) => {
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await api.get("/medicines/all");
      setMedicines(data.medicines || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      openLoginModal?.();
      return;
    }
    await api.post("/cart/add", { medicineId: id, quantity: 1 });
    alert("Added to cart");
  };

  const filteredMedicines = useMemo(() => {
    return medicines.filter((m) => {
      const matchesFilter =
        activeFilter === "All" ||
        m.type?.toLowerCase() === activeFilter.toLowerCase() ||
        m.category?.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        search === "" ||
        m.name?.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [medicines, activeFilter, search]);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <div className="p-3">
        <input
          placeholder="Search medicines..."
          className="w-full p-2.5 rounded-lg border border-gray-200 bg-white text-sm mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto mb-3 pb-1 scrollbar-hide">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                activeFilter === f
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {filteredMedicines.map((m) => (
              <MedicineCard
                key={m._id}
                medicine={m}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Medicines;