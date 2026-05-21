


// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Hero = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (!search.trim()) return;
//     navigate(`/medicines?keyword=${search}`);
//   };

//   const handleCategoryClick = (category) => {
//     navigate(`/medicines?keyword=${category}`);
//   };

//   return (
//     <section className="bg-gradient-to-br from-green-50 via-white to-orange-50">
//       <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        
//         {/* LEFT */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//             <span className="text-green-600">Apna</span>
//             <span className="text-orange-500">Care</span>
//             <br />
//             Medicine Delivery App
//           </h1>

//           <p className="mt-4 text-lg text-gray-600">
//             Apno ki dekhbhal, yahin se. Search medicines, upload prescription,
//             order quickly, and get delivery at your location.
//           </p>

//           <div className="mt-6 flex flex-wrap gap-3">
//             <Link
//               to="/medicines"
//               className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
//             >
//               Search Medicines
//             </Link>
//             <Link
//               to="/upload-prescription"
//               className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold"
//             >
//               Upload Prescription
//             </Link>
//           </div>
//         </div>

//         {/* RIGHT UI */}
//         <div className="flex justify-center">
//           <div className="w-[280px] sm:w-[320px] bg-white rounded-[2rem] shadow-2xl border-4 border-gray-900 p-4">
//             <div className="rounded-[1.5rem] bg-gradient-to-b from-green-600 to-green-500 text-white p-5 min-h-[520px]">

//               <div className="text-center mt-4">
//                 <h2 className="text-3xl font-bold">
//                   Apna<span className="text-orange-300">Care</span>
//                 </h2>
//                 <p className="mt-2 text-sm">Your trusted medicine partner</p>
//               </div>

//               {/* 🔍 SEARCH */}
//               <div className="mt-8 bg-white rounded-2xl p-4 text-gray-800">
//                 <input
//                   type="text"
//                   placeholder="Search medicine..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                   className="w-full border rounded-full px-4 py-3 outline-none"
//                 />

//                 {/* 🔥 CATEGORY BUTTONS */}
//                 <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
//                   <div
//                     onClick={() => handleCategoryClick("Diabetes")}
//                     className="bg-green-100 rounded-2xl p-3 font-semibold cursor-pointer hover:bg-green-200"
//                   >
//                     Diabetes
//                   </div>

//                   <div
//                     onClick={() => handleCategoryClick("Heart")}
//                     className="bg-orange-100 rounded-2xl p-3 font-semibold cursor-pointer hover:bg-orange-200"
//                   >
//                     Heart
//                   </div>

//                   <div
//                     onClick={() => handleCategoryClick("Skin")}
//                     className="bg-yellow-100 rounded-2xl p-3 font-semibold cursor-pointer hover:bg-yellow-200"
//                   >
//                     Skin
//                   </div>
//                 </div>
//               </div>

//               {/* OFFER */}
//               <div className="mt-6 bg-orange-500 rounded-2xl p-4">
//                 <p className="text-xl font-bold">20% Off</p>
//                 <p className="text-sm">On first order</p>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const value = search.trim();
    if (!value) return;
    navigate(`/medicines?keyword=${encodeURIComponent(value)}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/medicines?keyword=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-green-600">Apna</span>
            <span className="text-orange-500">Care</span>
            <br />
            Medicine Delivery App
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Apno ki dekhbhal, yahin se. Search medicines, upload prescription,
            order quickly, and get delivery at your location.
          </p>

          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
            <Link
              to="/medicines"
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
            >
              Search Medicines
            </Link>

            <Link
              to="/upload-prescription"
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600"
            >
              Upload Prescription
            </Link>
          </div>
        </div>

        {/* RIGHT MOBILE UI */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-[260px] sm:w-[300px] md:w-[320px] bg-white rounded-[2rem] shadow-2xl border-4 border-gray-900 p-4">

            <div className="rounded-[1.5rem] bg-gradient-to-b from-green-600 to-green-500 text-white p-5 min-h-[500px]">

              {/* APP HEADER */}
              <div className="text-center mt-4">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Apna<span className="text-orange-300">Care</span>
                </h2>
                <p className="mt-2 text-xs sm:text-sm">
                  Your trusted medicine partner
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="mt-6 bg-white rounded-2xl p-4 text-gray-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search medicine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    className="w-full border rounded-full px-4 py-2 sm:py-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700"
                  >
                    Go
                  </button>
                </div>

                {/* CATEGORY BUTTONS */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 text-[10px] sm:text-xs text-center">

                  <button
                    type="button"
                    onClick={() => handleCategoryClick("Diabetes")}
                    className="bg-green-100 rounded-2xl p-2 sm:p-3 font-semibold hover:bg-green-200"
                  >
                    Diabetes
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick("Heart")}
                    className="bg-orange-100 rounded-2xl p-2 sm:p-3 font-semibold hover:bg-orange-200"
                  >
                    Heart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCategoryClick("Skin")}
                    className="bg-yellow-100 rounded-2xl p-2 sm:p-3 font-semibold hover:bg-yellow-200"
                  >
                    Skin
                  </button>
                </div>
              </div>

              {/* OFFER CARD */}
              <div className="mt-5 bg-orange-500 rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-lg sm:text-xl font-bold">20% Off</p>
                <p className="text-xs sm:text-sm">On first order</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;