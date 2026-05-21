// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";

// const fallbackImage =
//   "https://via.placeholder.com/700x500?text=Medicine+Image";

// const getImageUrl = (imgPath) => {
//   if (!imgPath) return fallbackImage;
//   if (imgPath.startsWith("http")) return imgPath;
//   return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
// };

// const MedicineDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [medicine, setMedicine] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState("");
//   const [activeImage, setActiveImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [adding, setAdding] = useState(false);

//   const fetchMedicine = async () => {
//     try {
//       setLoading(true);
//       setPageError("");

//       const { data } = await api.get(`/medicines/${id}`);

//       if (data?.success && data?.medicine) {
//         setMedicine(data.medicine);
//       } else {
//         setPageError("Medicine not found");
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load medicine");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMedicine();
//   }, [id]);

//   const images = useMemo(() => {
//     if (!medicine) return [fallbackImage];

//     if (Array.isArray(medicine.images) && medicine.images.length > 0) {
//       return medicine.images;
//     }

//     if (medicine.image) return [medicine.image];

//     return [fallbackImage];
//   }, [medicine]);

//   const nextImage = () => {
//     setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const increaseQty = () => {
//     if (!medicine) return;
//     if (quantity < (medicine.stock || 1)) {
//       setQuantity((prev) => prev + 1);
//     }
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first");
//         navigate("/login");
//         return;
//       }

//       setAdding(true);

//       const { data } = await api.post("/cart/add", {
//         medicineId: medicine._id,
//         quantity,
//       });

//       if (data?.success) {
//         alert("Medicine added to cart");
//       } else {
//         alert(data?.message || "Failed to add to cart");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Add to cart failed");
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//       {/* <Navbar /> */}

//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">
//         <div className="mb-5">
//           <Link
//             to="/medicines"
//             className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline"
//           >
//             ← Back to Medicines
//           </Link>
//         </div>

//         {loading && (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center">
//             <p className="text-lg font-semibold text-gray-700">
//               Loading medicine details...
//             </p>
//           </div>
//         )}

//         {!loading && pageError && (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center">
//             <p className="text-lg font-semibold text-red-600">{pageError}</p>
//           </div>
//         )}

//         {!loading && !pageError && medicine && (
//           <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
//             <div className="bg-white rounded-[28px] p-4 md:p-5 shadow-sm border border-gray-100">
//               <div className="relative">
//                 <img
//                   src={getImageUrl(images[activeImage])}
//                   alt={medicine.name}
//                   className="w-full h-[300px] sm:h-[380px] md:h-[440px] object-cover rounded-[22px]"
//                   onError={(e) => {
//                     e.target.src = fallbackImage;
//                   }}
//                 />

//                 {images.length > 1 && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={prevImage}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow text-xl text-gray-700"
//                     >
//                       ‹
//                     </button>

//                     <button
//                       type="button"
//                       onClick={nextImage}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow text-xl text-gray-700"
//                     >
//                       ›
//                     </button>
//                   </>
//                 )}

//                 {medicine.prescriptionRequired && (
//                   <span className="absolute top-4 left-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold border border-red-200">
//                     Prescription Required
//                   </span>
//                 )}
//               </div>

//               <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
//                 {images.map((img, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     onClick={() => setActiveImage(index)}
//                     className={`min-w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 ${
//                       activeImage === index
//                         ? "border-green-600"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <img
//                       src={getImageUrl(img)}
//                       alt={`thumb-${index}`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = fallbackImage;
//                       }}
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-[28px] p-5 md:p-6 shadow-sm border border-gray-100">
//               <div className="flex flex-wrap items-center gap-2 mb-3">
//                 <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
//                   {medicine.type || "Medicine"}
//                 </span>

//                 <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
//                   {medicine.category || "General"}
//                 </span>

//                 {medicine.brand && (
//                   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
//                     {medicine.brand}
//                   </span>
//                 )}
//               </div>

//               <h1 className="text-3xl font-extrabold text-gray-800">
//                 {medicine.name}
//               </h1>

//               <p className="mt-3 text-gray-600 leading-7">
//                 {medicine.description || "No description available for this medicine."}
//               </p>

//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
//                   <p className="text-sm text-gray-400">Price</p>
//                   <p className="text-2xl font-bold text-green-600 mt-1">
//                     ₹{medicine.price}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
//                   <p className="text-sm text-gray-400">Stock</p>
//                   <p
//                     className={`text-lg font-bold mt-1 ${
//                       medicine.stock > 0 ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {medicine.stock > 0
//                       ? `${medicine.stock} Available`
//                       : "Out of Stock"}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <p className="text-sm text-gray-500 mb-3">Select Quantity</p>

//                 <div className="flex items-center gap-4">
//                   <button
//                     type="button"
//                     onClick={decreaseQty}
//                     disabled={quantity <= 1}
//                     className="w-11 h-11 rounded-full border border-gray-300 text-xl font-bold disabled:opacity-50"
//                   >
//                     -
//                   </button>

//                   <span className="min-w-[40px] text-center text-xl font-bold text-gray-800">
//                     {quantity}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={increaseQty}
//                     disabled={quantity >= (medicine.stock || 1)}
//                     className="w-11 h-11 rounded-full border border-gray-300 text-xl font-bold disabled:opacity-50"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-8 grid sm:grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={adding || medicine.stock <= 0}
//                   className="rounded-full bg-orange-500 text-white py-3.5 font-semibold hover:bg-orange-600 disabled:opacity-70"
//                 >
//                   {adding ? "Adding..." : "Add to Cart"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => navigate("/cart")}
//                   className="rounded-full border border-green-600 text-green-700 py-3.5 font-semibold hover:bg-green-50"
//                 >
//                   Go to Cart
//                 </button>
//               </div>

//               <div className="mt-8 rounded-[22px] bg-[#f8faf8] border border-gray-100 p-4">
//                 <h3 className="text-lg font-bold text-gray-800">Medicine Info</h3>

//                 <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
//                   <div className="rounded-2xl bg-white border border-gray-100 p-3">
//                     <p className="text-gray-400">Type</p>
//                     <p className="font-semibold text-gray-700 mt-1">
//                       {medicine.type || "N/A"}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl bg-white border border-gray-100 p-3">
//                     <p className="text-gray-400">Category</p>
//                     <p className="font-semibold text-gray-700 mt-1">
//                       {medicine.category || "N/A"}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl bg-white border border-gray-100 p-3">
//                     <p className="text-gray-400">Brand</p>
//                     <p className="font-semibold text-gray-700 mt-1">
//                       {medicine.brand || "N/A"}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl bg-white border border-gray-100 p-3">
//                     <p className="text-gray-400">Expiry Date</p>
//                     <p className="font-semibold text-gray-700 mt-1">
//                       {medicine.expiryDate
//                         ? new Date(medicine.expiryDate).toLocaleDateString()
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <BottomNav />
//     </div>
//   );
// };

// export default MedicineDetails;



import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import api from "../api/api";
import fallbackImage from "../assets/fallback.jpeg";

const getImageUrl = (imgPath) => {
  if (!imgPath) return fallbackImage;
  if (imgPath.includes("via.placeholder.com")) return fallbackImage;
  if (imgPath.startsWith("http")) return imgPath;
  return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
};

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const fetchMedicine = async () => {
    try {
      setLoading(true);
      setPageError("");
      const { data } = await api.get(`/medicines/${id}`);
      if (data?.success && data?.medicine) {
        setMedicine(data.medicine);
      } else {
        setPageError("Medicine not found");
      }
    } catch (error) {
      console.error(error);
      setPageError("Failed to load medicine");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const images = useMemo(() => {
    if (!medicine) return [fallbackImage];
    if (Array.isArray(medicine.images) && medicine.images.length > 0) {
      const validImages = medicine.images.filter(
        (img) => img && !img.includes("via.placeholder.com")
      );
      return validImages.length > 0 ? validImages : [fallbackImage];
    }
    if (medicine.image && !medicine.image.includes("via.placeholder.com")) {
      return [medicine.image];
    }
    return [fallbackImage];
  }, [medicine]);

  const discountedPrice = medicine?.offer
    ? Math.round(medicine.mrp - (medicine.mrp * medicine.offer) / 100)
    : null;

  const increaseQty = () => {
    if (quantity < (medicine?.stock || 1)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      setAdding(true);
      await api.post("/cart/add", { medicineId: medicine._id, quantity });
      alert("Medicine added to cart");
    } catch (error) {
      console.error(error);
      alert("Add to cart failed");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="max-w-4xl mx-auto px-4 py-5">
        <Link to="/medicines" className="text-green-600 text-sm font-medium">
          ← Back to Medicines
        </Link>

        {loading ? (
          <p className="text-center mt-10 text-gray-500">Loading...</p>
        ) : pageError ? (
          <p className="text-red-500 mt-4">{pageError}</p>
        ) : (
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* IMAGE SECTION */}
            <div className="relative bg-gray-50">
              <img
                src={getImageUrl(images[activeImage])}
                alt={medicine.name}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => (e.target.src = fallbackImage)}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow text-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow text-lg"
                  >
                    ›
                  </button>
                </>
              )}

              {medicine.offer ? (
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {medicine.offer}% OFF
                </div>
              ) : null}
            </div>

            {/* THUMBNAIL STRIP */}
            {images.length > 1 && (
              <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={getImageUrl(img)}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 ${
                      activeImage === i ? "border-green-500" : "border-transparent"
                    }`}
                    onError={(e) => (e.target.src = fallbackImage)}
                  />
                ))}
              </div>
            )}

            {/* DETAILS SECTION */}
            <div className="p-4 md:p-6 space-y-4">

              {/* NAME + BADGES */}
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {medicine.type}
                  </span>
                  {medicine.category && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {medicine.category}
                    </span>
                  )}
                  {medicine.prescriptionRequired && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      Rx Required
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {medicine.name}
                </h1>
                {medicine.brand && (
                  <p className="text-sm text-gray-500 mt-0.5">by {medicine.brand}</p>
                )}
              </div>

              {/* PRICE */}
              <div className="bg-gray-50 rounded-xl p-3">
                {medicine.offer ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{discountedPrice}
                      </span>
                      <span className="text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-semibold">
                        {medicine.offer}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-through mt-0.5">
                      MRP ₹{medicine.mrp}
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      You save ₹{medicine.mrp - discountedPrice}
                    </p>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{medicine.mrp}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {medicine.description && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {medicine.description}
                  </p>
                </div>
              )}

              {/* STOCK */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Stock:</span>
                <span className={`text-sm font-semibold ${
                  medicine.stock > 0 ? "text-green-600" : "text-red-500"
                }`}>
                  {medicine.stock > 0 ? `${medicine.stock} available` : "Out of stock"}
                </span>
              </div>

              {/* QUANTITY */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQty}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    disabled={quantity >= medicine.stock}
                    className="w-9 h-9 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                disabled={adding || medicine.stock === 0}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-base hover:bg-orange-600 disabled:opacity-60"
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MedicineDetails;