


// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import fallbackMedicine from "../assets/fallback.jpeg";

// const categories = [
//   "All",
//   "Diabetes",
//   "Heart",
//   "Stomach",
//   "Skin",
//   "Pain",
//   "Vitamins",
//   "fever",
// ];

// const getImageUrl = (imgPath) => {
//   if (!imgPath) return fallbackMedicine;
//   if (imgPath.includes("via.placeholder.com")) return fallbackMedicine;
//   if (imgPath.startsWith("http")) return imgPath;
//   return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
// };

// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good Morning 🌅";
//   if (hour < 17) return "Good Afternoon ☀️";
//   if (hour < 21) return "Good Evening 🌆";
//   return "Good Night 🌙";
// };

// const Home = ({ openLoginModal }) => {
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [cart, setCart] = useState([]);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const { data } = await api.get("/medicines/all");
//         setMedicines(data.medicines || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return medicines.filter((item) => {
//       const matchesCategory =
//         selectedCategory === "All" ||
//         item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
//         item.type?.toLowerCase() === selectedCategory.toLowerCase();

//       const matchesSearch =
//         item.name?.toLowerCase().includes(search.toLowerCase()) ||
//         item.type?.toLowerCase().includes(search.toLowerCase()) ||
//         item.category?.toLowerCase().includes(search.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [medicines, search, selectedCategory]);

//   const handleAddToCart = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       openLoginModal?.();
//       return;
//     }
//     try {
//       await api.post("/cart/add", { medicineId: id, quantity: 1 });
//       alert("Added to cart");
//     } catch (error) {
//       alert(error?.response?.data?.message || "Failed to add to cart");
//     }
//   };

//   const handlePrescriptionUpload = (e) => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");
//     if (!user) {
//       openLoginModal?.();
//       e.target.value = "";
//       return;
//     }
//     const file = e.target.files[0];
//     if (file) setUploadedFile(file);
//   };

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 lg:pb-0">
//       <main className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-6">

//         <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
//           <section className="space-y-6">

//             <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//               <p className="text-sm opacity-90">{getGreeting()}</p>
//               <h1 className="text-2xl md:text-4xl font-bold mt-1 leading-tight">
//                 Welcome to <span className="text-orange-300">ApnaCare</span>
//               </h1>
//               <p className="mt-3 text-sm md:text-base text-green-50 max-w-2xl leading-7">
//                 ApnaCare ek smart online medical and healthcare platform hai
//                 jahan user medicines search kar sakta hai, doctor prescription
//                 upload kar sakta hai, aur ghar baithe medicine delivery ka
//                 benefit le sakta hai.
//               </p>

//               <div className="mt-5 bg-white rounded-full px-4 py-3 flex items-center gap-3">
//                 <span className="text-gray-400">🔍</span>
//                 <input
//                   type="text"
//                   placeholder="Search medicines by name, type, category..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full outline-none text-gray-700 bg-transparent"
//                 />
//               </div>

//               <div className="mt-5 flex flex-wrap gap-2">
//                 {categories.map((item) => (
//                   <button
//                     key={item}
//                     onClick={() => setSelectedCategory(item)}
//                     className={`px-4 py-2 rounded-full border text-sm transition ${
//                       selectedCategory === item
//                         ? "bg-orange-500 border-orange-500 text-white"
//                         : "bg-white/15 border-white/20 text-white"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-[28px] bg-gradient-to-r from-orange-500 to-orange-400 text-white p-5 md:p-6 shadow-md flex items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm opacity-90">Limited Time Offer</p>
//                 <h2 className="text-2xl md:text-3xl font-bold mt-1">Extra Savings</h2>
//                 <p className="text-sm mt-1">
//                   Best prices on medicines with fast home delivery
//                 </p>
//               </div>
//               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl">
//                 💊
//               </div>
//             </div>
//           </section>

//           <aside className="hidden lg:block">
//             <div className="sticky top-24 space-y-5">
//               <div className="bg-white rounded-[30px] shadow-md p-5">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Upload Prescription
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Upload doctor prescription and admin will identify medicines
//                   for you.
//                 </p>
//                 <label className="mt-4 h-40 rounded-[24px] border-2 border-dashed border-green-300 bg-green-50 flex items-center justify-center text-gray-500 cursor-pointer text-center px-4">
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={handlePrescriptionUpload}
//                   />
//                   {uploadedFile
//                     ? `Selected: ${uploadedFile.name}`
//                     : "Click to Upload Prescription"}
//                 </label>
//                 <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition">
//                   Upload Now
//                 </button>
//               </div>

//               <div className="bg-white rounded-[30px] shadow-md p-5">
//                 <h3 className="text-xl font-bold text-gray-800">Quick Stats</h3>
//                 <div className="grid grid-cols-2 gap-3 mt-4">
//                   <div className="rounded-2xl bg-green-50 p-4">
//                     <p className="text-sm text-gray-500">Products</p>
//                     <p className="text-2xl font-bold text-green-600 mt-1">
//                       {medicines.length}
//                     </p>
//                   </div>
//                   <div className="rounded-2xl bg-orange-50 p-4">
//                     <p className="text-sm text-gray-500">Cart</p>
//                     <p className="text-2xl font-bold text-orange-500 mt-1">
//                       {cart.length}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//               Popular Medicines
//             </h2>
//             <span className="text-green-600 font-semibold text-sm md:text-base">
//               {filteredProducts.length} Items
//             </span>
//           </div>

//           {loading ? (
//             <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm">
//               Loading medicines...
//             </div>
//           ) : filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
//               {filteredProducts.map((item) => {
//                 const basePrice = item.mrp || item.price || 0;
//                 const discountedPrice = item.offer
//                   ? Math.round(basePrice - (basePrice * item.offer) / 100)
//                   : null;

//                 return (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col"
//                   >
//                     <div className="relative">
//                       <img
//                         src={getImageUrl(item.images?.[0])}
//                         alt={item.name}
//                         className="w-full h-28 md:h-32 object-cover"
//                         onError={(e) => (e.target.src = fallbackMedicine)}
//                       />
//                       {item.offer ? (
//                         <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
//                           {item.offer}% OFF
//                         </div>
//                       ) : null}
//                     </div>

//                     <div className="p-2.5 flex flex-col flex-1">
//                       <h3 className="font-semibold text-gray-800 text-xs md:text-sm line-clamp-2 leading-tight">
//                         {item.name}
//                       </h3>
//                       <p className="text-[10px] text-gray-400 mt-0.5">
//                         {item.type} • {item.category}
//                       </p>

//                       <div className="mt-1.5">
//                         {item.offer ? (
//                           <>
//                             <div className="flex items-center gap-1">
//                               <span className="text-sm font-bold text-gray-900">
//                                 ₹{discountedPrice}
//                               </span>
//                               <span className="text-[10px] text-green-600 font-semibold">
//                                 {item.offer}% off
//                               </span>
//                             </div>
//                             <span className="text-[10px] text-gray-400 line-through">
//                               MRP ₹{basePrice}
//                             </span>
//                           </>
//                         ) : (
//                           <span className="text-sm font-bold text-gray-900">
//                             ₹{basePrice}
//                           </span>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => handleAddToCart(item._id)}
//                         className="mt-auto pt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5 rounded-lg font-medium"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm">
//               No medicines found for your search/category.
//             </div>
//           )}
//         </section>

//         <section className="bg-white rounded-[30px] shadow-md p-6 md:p-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//             About ApnaCare
//           </h2>
//           <p className="mt-4 text-gray-600 leading-8 text-sm md:text-base">
//             ApnaCare ek digital healthcare support platform hai jo users ko
//             medicines kharidne, prescription upload karne, aur health-related
//             services ko ek hi jagah par access karne ki सुविधा deta hai.
//           </p>
//         </section>

//       </main>
//       <BottomNav />
//     </div>
//   );
// };

// export default Home;


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import api from "../api/api";
import fallbackMedicine from "../assets/fallback.jpeg";

const categories = [
  "All",
  "Diabetes",
  "Heart",
  "Stomach",
  "Skin",
  "Pain",
  "Vitamins",
  "Fever",
];

const getImageUrl = (imgPath) => {
  if (!imgPath) return fallbackMedicine;
  if (imgPath.includes("via.placeholder.com")) return fallbackMedicine;
  if (imgPath.startsWith("http")) return imgPath;
  return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning 🌅";
  if (hour < 17) return "Good Afternoon ☀️";
  if (hour < 21) return "Good Evening 🌆";
  return "Good Night 🌙";
};

const Home = ({ openLoginModal }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
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
    fetchMedicines();
  }, []);

  const filteredProducts = useMemo(() => {
    return medicines.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.type?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.type?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [medicines, search, selectedCategory]);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 20);

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      openLoginModal?.();
      return;
    }
    try {
      await api.post("/cart/add", { medicineId: id, quantity: 1 });
      alert("Added to cart");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to add to cart");
    }
  };

  const handlePrescriptionUpload = (e) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      openLoginModal?.();
      e.target.value = "";
      return;
    }
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-[#f6fff7] pb-24 lg:pb-0">
      <main className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-8">

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <section className="space-y-6">
            <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
              <p className="text-sm opacity-90">{getGreeting()}</p>
              <h1 className="text-2xl md:text-4xl font-bold mt-1 leading-tight">
                Welcome to <span className="text-orange-300">ApnaCare</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-green-50 max-w-2xl leading-7">
                ApnaCare ek smart online medical and healthcare platform hai
                jahan user medicines search kar sakta hai, doctor prescription
                upload kar sakta hai, aur ghar baithe medicine delivery ka
                benefit le sakta hai.
              </p>
              <div className="mt-5 bg-white rounded-full px-4 py-3 flex items-center gap-3">
                <span className="text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search medicines by name, type, category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-gray-700 bg-transparent"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedCategory(item)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      selectedCategory === item
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "bg-white/15 border-white/20 text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-gradient-to-r from-orange-500 to-orange-400 text-white p-5 md:p-6 shadow-md flex items-center justify-between gap-4">
              <div>
                <p className="text-sm opacity-90">Limited Time Offer</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1">Extra Savings</h2>
                <p className="text-sm mt-1">
                  Best prices on medicines with fast home delivery
                </p>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                💊
              </div>
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <div className="bg-white rounded-[30px] shadow-md p-5">
                <h3 className="text-xl font-bold text-gray-800">Upload Prescription</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Upload doctor prescription and admin will identify medicines for you.
                </p>
                <label className="mt-4 h-40 rounded-[24px] border-2 border-dashed border-green-300 bg-green-50 flex items-center justify-center text-gray-500 cursor-pointer text-center px-4">
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handlePrescriptionUpload}
                  />
                  {uploadedFile ? `Selected: ${uploadedFile.name}` : "Click to Upload Prescription"}
                </label>
                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition">
                  Upload Now
                </button>
              </div>

              <div className="bg-white rounded-[30px] shadow-md p-5">
                <h3 className="text-xl font-bold text-gray-800">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-sm text-gray-500">Products</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{medicines.length}</p>
                  </div>
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <p className="text-sm text-gray-500">Cart</p>
                    <p className="text-2xl font-bold text-orange-500 mt-1">{cart.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Popular Medicines</h2>
            <span className="text-green-600 font-semibold text-sm md:text-base">
              {filteredProducts.length} Items
            </span>
          </div>

          {loading ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm">
              Loading medicines...
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {displayedProducts.map((item) => {
                  const basePrice = item.mrp || item.price || 0;
                  const discountedPrice = item.offer
                    ? Math.round(basePrice - (basePrice * item.offer) / 100)
                    : null;

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={getImageUrl(item.images?.[0])}
                          alt={item.name}
                          className="w-full h-28 md:h-32 object-cover"
                          onError={(e) => (e.target.src = fallbackMedicine)}
                        />
                        {item.offer ? (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {item.offer}% OFF
                          </div>
                        ) : null}
                      </div>

                      <div className="p-2.5 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {item.type} • {item.category}
                        </p>

                        <div className="mt-2">
                          {item.offer ? (
                            <>
                              <div className="flex items-center gap-1">
                                <span className="text-base font-extrabold text-gray-900">
                                  ₹{discountedPrice}
                                </span>
                                <span className="text-[10px] text-green-600 font-bold">
                                  {item.offer}% off
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-400 line-through">
                                MRP ₹{basePrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-base font-extrabold text-gray-900">
                              ₹{basePrice}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(item._id)}
                          className="mt-auto pt-2 w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs py-2 rounded-lg font-bold tracking-wide shadow-sm transition-all"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length > 20 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-8 py-3 rounded-full border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition"
                  >
                    {showAll ? "Show Less" : "View All Medicines"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm">
              No medicines found for your search/category.
            </div>
          )}
        </section>

        <section className="bg-white rounded-[30px] shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Why Choose ApnaCare? 💚
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🚚", title: "Fast Delivery", desc: "Same day delivery available in your city" },
              { icon: "✅", title: "Genuine Medicines", desc: "100% authentic medicines from trusted brands" },
              { icon: "💰", title: "Best Prices", desc: "Lowest prices with exclusive offers and discounts" },
              { icon: "👨‍⚕️", title: "Expert Support", desc: "Medical experts available for guidance" },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[30px] shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Health Tips 🏥
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "💧", title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily. Proper hydration helps in digestion, skin health and overall body function." },
              { icon: "🥗", title: "Balanced Diet", desc: "Include fruits, vegetables, proteins and whole grains in your daily diet. Avoid processed and junk food as much as possible." },
              { icon: "🏃", title: "Regular Exercise", desc: "At least 30 minutes of physical activity daily keeps heart disease, diabetes and obesity at bay." },
              { icon: "😴", title: "Proper Sleep", desc: "7-8 hours of quality sleep is essential for mental health, immunity and overall body recovery." },
              { icon: "💊", title: "Take Medicines on Time", desc: "Always take prescribed medicines on time. Never skip doses and consult your doctor before stopping any medication." },
              { icon: "🩺", title: "Regular Checkups", desc: "Get regular health checkups done even if you feel healthy. Early detection of disease leads to better treatment." },
            ].map((tip, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition">
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{tip.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-5">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[30px] shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            About ApnaCare 🏪
          </h2>
          <p className="text-gray-600 leading-8 text-sm md:text-base">
            ApnaCare ek digital healthcare support platform hai jo users ko medicines kharidne,
            prescription upload karne, aur health-related services ko ek hi jagah par access
            karne ki suvidha deta hai. Hamara vision hai ki har ghar tak quality healthcare
            pahunche — affordable, fast aur trusted tarike se.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center bg-green-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-green-600">500+</p>
              <p className="text-xs text-gray-500 mt-1">Medicines Available</p>
            </div>
            <div className="text-center bg-orange-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-orange-500">1000+</p>
              <p className="text-xs text-gray-500 mt-1">Happy Customers</p>
            </div>
            <div className="text-center bg-blue-50 rounded-2xl p-4">
              <p className="text-2xl font-extrabold text-blue-500">24/7</p>
              <p className="text-xs text-gray-500 mt-1">Support Available</p>
            </div>
          </div>
        </section>
<section className="bg-white rounded-[30px] shadow-md p-6 md:p-8">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
    Contact Us 📞
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    
    {/* LEFT SIDE INFO */}
    <div className="space-y-4">
      {[
        {
          icon: "📍",
          label: "Address",
          value:
            "123, ApnaCare Medical Center, Chauri Chaura, Gorakhpur, Uttar Pradesh - 211001",
        },
        {
          icon: "📞",
          label: "Phone",
          value: "+91 8810891046, +91 8874113875",
        },
        {
          icon: "📧",
          label: "Email",
          value: "apnacare771@gmail.com",
        },
        {
          icon: "🕐",
          label: "Working Hours",
          value: "Mon - Sat: 9:00 AM - 8:00 PM",
        },
      ].map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span className="text-xl">{item.icon}</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">{item.label}</p>
            <p className="text-sm text-gray-700 font-semibold">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* RIGHT SIDE ACTION */}
    <div className="bg-green-50 rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-gray-800">Call Us Directly</h3>
      <p className="text-sm text-gray-500">
        Kisi bhi medicine ya order related query ke liye directly call karein.
      </p>

      {/* CALL BUTTON 1 */}
      <a
        href="tel:+918810891046"
        className="flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-2xl hover:bg-green-700 active:scale-95 transition-all"
      >
        <span className="text-2xl">📞</span>
        <div>
          <p className="text-xs opacity-80">Call Number 1</p>
          <p className="text-lg font-bold">+91 8810891046</p>
        </div>
      </a>

      {/* CALL BUTTON 2 */}
      <a
        href="tel:+918874113875"
        className="flex items-center gap-3 bg-green-600 text-white px-5 py-4 rounded-2xl hover:bg-green-700 active:scale-95 transition-all"
      >
        <span className="text-2xl">📞</span>
        <div>
          <p className="text-xs opacity-80">Call Number 2</p>
          <p className="text-lg font-bold">+91 8874113875</p>
        </div>
      </a>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/918810891046?text=Hello%20ApnaCare"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 bg-[#25D366] text-white px-5 py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all"
      >
        <span className="text-2xl">💬</span>
        <div>
          <p className="text-xs opacity-80">Chat on WhatsApp</p>
          <p className="text-lg font-bold">+91 8874113875</p>
        </div>
      </a>

      {/* EMAIL BUTTON */}
      <a
        href="mailto:apnacare771@gmail.com"
        className="flex items-center gap-3 bg-orange-500 text-white px-5 py-4 rounded-2xl hover:bg-orange-600 active:scale-95 transition-all"
      >
        <span className="text-2xl">📧</span>
        <div>
          <p className="text-xs opacity-80">Email Us</p>
          <p className="text-lg font-bold">apnacare771@gmail.com</p>
        </div>
      </a>
    </div>
  </div>
</section>

        <div className="text-center py-4 text-xs text-gray-400">
          © 2026 ApnaCare. All rights reserved. Made with ❤️ for better healthcare.
        </div>

      </main>
      <BottomNav />
    </div>
  );
};

export default Home;