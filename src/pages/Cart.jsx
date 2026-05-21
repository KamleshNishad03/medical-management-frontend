



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";

// // const fallbackImage =
// //   "https://via.placeholder.com/600x400?text=Medicine+Image";
// // const fallbackImage =
// //   "https://dummyimage.com/600x400/cccccc/000000&text=Medicine+Image";

// // const getImageUrl = (imgPath) => {
// //   if (!imgPath) return fallbackImage;
// //   if (imgPath.startsWith("http")) return imgPath;
// //   return `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`;
// // };


// const fallbackImage =
//   "https://dummyimage.com/600x400/cccccc/000000&text=No+Image";

// const getImageUrl = (imgPath) => {
//   if (!imgPath || imgPath.trim() === "") return fallbackImage;

//   // already full URL
//   if (imgPath.startsWith("http")) return imgPath;

//   // fix slashes
//   let cleanPath = imgPath.replace(/\\/g, "/");

//   // ensure uploads folder
//   if (!cleanPath.startsWith("uploads/")) {
//     cleanPath = "uploads/" + cleanPath;
//   }

//   return `http://localhost:5000/${cleanPath}`;
// };



// const Cart = () => {
//   const navigate = useNavigate();

//   const [cart, setCart] = useState({
//     items: [],
//     totalPrice: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState("");
//   const [pageError, setPageError] = useState("");

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       setPageError("");

//       const token = localStorage.getItem("token");
//       if (!token) {
//         setPageError("Please login first");
//         setCart({ items: [], totalPrice: 0 });
//         return;
//       }

//       const { data } = await api.get("/cart/my");

//       if (data?.success) {
//         setCart(data.cart || { items: [], totalPrice: 0 });
//       } else {
//         setCart({ items: [], totalPrice: 0 });
//       }
//     } catch (error) {
//       console.error(error);
//       setPageError(error?.response?.data?.message || "Failed to load cart");
//       setCart({ items: [], totalPrice: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);


  

//   const updateQuantity = async (medicineId, quantity) => {
//     try {
//       setActionLoading(medicineId);

//       const { data } = await api.put("/cart/update", {
//         medicineId,
//         quantity,
//       });

//       if (data?.success) {
//         setCart(data.cart);
//       } else {
//         alert(data?.message || "Failed to update cart");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to update cart");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const removeItem = async (medicineId) => {
//     try {
//       setActionLoading(medicineId);

//       const { data } = await api.delete(`/cart/remove/${medicineId}`);

//       if (data?.success) {
//         setCart(data.cart);
//       } else {
//         alert(data?.message || "Failed to remove item");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to remove item");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const clearCart = async () => {
//     try {
//       setActionLoading("clear-cart");

//       const { data } = await api.delete("/cart/clear");

//       if (data?.success) {
//         setCart({
//           items: [],
//           totalPrice: 0,
//         });
//       } else {
//         alert(data?.message || "Failed to clear cart");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.message || "Failed to clear cart");
//     } finally {
//       setActionLoading("");
//     }
//   };

//   const handleCheckout = () => {
//     if (!cart?.items?.length) {
//       alert("Your cart is empty");
//       return;
//     }
//     navigate("/checkout");
//   };

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//       {/* <Navbar /> */}

//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">
//         <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//           <p className="text-sm text-green-100">Your Medicines</p>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//             My Cart
//           </h1>
//           <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
//             Review your selected medicines, update quantity, and proceed to checkout.
//           </p>
//         </div>

//         {loading && (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//             <p className="text-lg font-semibold text-gray-700">Loading cart...</p>
//           </div>
//         )}

//         {!loading && pageError && (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//             <p className="text-lg font-semibold text-red-600">{pageError}</p>
//           </div>
//         )}

//         {!loading && !pageError && cart?.items?.length === 0 && (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//             <p className="text-xl font-semibold text-gray-800">Your cart is empty</p>
//             <p className="text-sm text-gray-500 mt-2">
//               Add some medicines from the medicines page.
//             </p>
//             <button
//               onClick={() => navigate("/medicines")}
//               className="mt-4 rounded-full bg-orange-500 text-white px-6 py-3 font-medium hover:bg-orange-600"
//             >
//               Browse Medicines
//             </button>
//           </div>
//         )}

//         {!loading && !pageError && cart?.items?.length > 0 && (
//           <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6 mt-6">
//             <div className="space-y-4">
//               {cart.items.map((item) => {
//                 const medicine = item.medicine || {};
//                 const image =
//                   medicine.images?.[0] || medicine.image || fallbackImage;

//                 return (
//                   <div
//                     key={medicine._id}
//                     className="bg-white rounded-[24px] p-4 md:p-5 shadow-sm border border-gray-100"
//                   >
//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <img
//                         src={getImageUrl(image)}
//                         alt={medicine.name}
//                         className="w-full sm:w-32 h-32 object-cover rounded-[18px]"
//                         onError={(e) => {
//                           e.target.src = fallbackImage;
//                         }}
//                       />

//                       <div className="flex-1">
//                         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
//                           <div>
//                             <h2 className="text-xl font-bold text-gray-800">
//                               {medicine.name}
//                             </h2>
//                             <p className="text-sm text-gray-500 mt-1">
//                               {medicine.type || "Medicine"}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {medicine.category || "General"}
//                             </p>
//                           </div>

//                           <div className="text-left md:text-right">
//                             <p className="text-sm text-gray-400">Unit Price</p>
//                             <p className="text-lg font-bold text-green-600">
//                               ₹{item.price}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                           <div className="flex items-center gap-3">
//                             <button
//                               onClick={() =>
//                                 item.quantity > 1 &&
//                                 updateQuantity(medicine._id, item.quantity - 1)
//                               }
//                               disabled={
//                                 actionLoading === medicine._id || item.quantity <= 1
//                               }
//                               className="w-10 h-10 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-50"
//                             >
//                               -
//                             </button>

//                             <span className="min-w-[30px] text-center font-semibold text-lg">
//                               {item.quantity}
//                             </span>

//                             <button
//                               onClick={() =>
//                                 updateQuantity(medicine._id, item.quantity + 1)
//                               }
//                               disabled={actionLoading === medicine._id}
//                               className="w-10 h-10 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-50"
//                             >
//                               +
//                             </button>
//                           </div>

//                           <div className="flex items-center gap-3">
//                             <div className="text-right">
//                               <p className="text-sm text-gray-400">Subtotal</p>
//                               <p className="text-lg font-bold text-gray-800">
//                                 ₹{item.price * item.quantity}
//                               </p>
//                             </div>

//                             <button
//                               onClick={() => removeItem(medicine._id)}
//                               disabled={actionLoading === medicine._id}
//                               className="rounded-full bg-red-50 text-red-600 px-4 py-2 font-medium hover:bg-red-100 disabled:opacity-50"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div>
//               <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 sticky top-24">
//                 <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

//                 <div className="mt-5 space-y-3">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Items</span>
//                     <span>{cart.items.length}</span>
//                   </div>

//                   <div className="flex justify-between text-gray-600">
//                     <span>Total Price</span>
//                     <span>₹{cart.totalPrice}</span>
//                   </div>

//                   <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
//                     <span>Grand Total</span>
//                     <span className="text-green-600">₹{cart.totalPrice}</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleCheckout}
//                   className="w-full mt-5 rounded-full bg-orange-500 text-white py-3.5 font-semibold hover:bg-orange-600"
//                 >
//                   Proceed to Checkout
//                 </button>

//                 <button
//                   onClick={clearCart}
//                   disabled={actionLoading === "clear-cart"}
//                   className="w-full mt-3 rounded-full border border-red-300 text-red-600 py-3 font-semibold hover:bg-red-50 disabled:opacity-50"
//                 >
//                   {actionLoading === "clear-cart" ? "Clearing..." : "Clear Cart"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <BottomNav />
//     </div>
//   );
// };

// export default Cart;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import api from "../api/api";

const fallbackImage =
  "https://dummyimage.com/600x400/cccccc/000000&text=No+Image";

const getImageUrl = (imgPath) => {
  if (!imgPath || imgPath.trim() === "") return fallbackImage;
  if (imgPath.startsWith("http")) return imgPath;
  let cleanPath = imgPath.replace(/\\/g, "/");
  if (!cleanPath.startsWith("uploads/")) {
    cleanPath = "uploads/" + cleanPath;
  }
  return `http://localhost:5000/${cleanPath}`;
};

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [pageError, setPageError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      setPageError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setPageError("Please login first");
        setCart({ items: [], totalPrice: 0 });
        return;
      }

      const { data } = await api.get("/cart/my");

      if (data?.success) {
        setCart(data.cart || { items: [], totalPrice: 0 });
      } else {
        setCart({ items: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error(error);
      setPageError(error?.response?.data?.message || "Failed to load cart");
      setCart({ items: [], totalPrice: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (medicineId, quantity) => {
    try {
      setActionLoading(medicineId);
      const { data } = await api.put("/cart/update", { medicineId, quantity });
      if (data?.success) {
        setCart(data.cart);
      } else {
        alert(data?.message || "Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to update cart");
    } finally {
      setActionLoading("");
    }
  };

  const removeItem = async (medicineId) => {
    try {
      setActionLoading(medicineId);
      const { data } = await api.delete(`/cart/remove/${medicineId}`);
      if (data?.success) {
        setCart(data.cart);
      } else {
        alert(data?.message || "Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to remove item");
    } finally {
      setActionLoading("");
    }
  };

  const clearCart = async () => {
    try {
      setActionLoading("clear-cart");
      const { data } = await api.delete("/cart/clear");
      if (data?.success) {
        setCart({ items: [], totalPrice: 0 });
      } else {
        alert(data?.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to clear cart");
    } finally {
      setActionLoading("");
    }
  };

  const handleCheckout = () => {
    if (!cart?.items?.length) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
      <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">
        <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
          <p className="text-sm text-green-100">Your Medicines</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">My Cart</h1>
          <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
            Review your selected medicines, update quantity, and proceed to checkout.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-lg font-semibold text-gray-700">Loading cart...</p>
          </div>
        )}

        {!loading && pageError && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-lg font-semibold text-red-600">{pageError}</p>
          </div>
        )}

        {!loading && !pageError && cart?.items?.length === 0 && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-xl font-semibold text-gray-800">Your cart is empty</p>
            <p className="text-sm text-gray-500 mt-2">
              Add some medicines from the medicines page.
            </p>
            <button
              onClick={() => navigate("/medicines")}
              className="mt-4 rounded-full bg-orange-500 text-white px-6 py-3 font-medium hover:bg-orange-600"
            >
              Browse Medicines
            </button>
          </div>
        )}

        {!loading && !pageError && cart?.items?.length > 0 && (
          <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6 mt-6">
            <div className="space-y-4">
              {cart.items.map((item) => {
                const medicine = item.medicine || {};
                const image = medicine.images?.[0] || fallbackImage;

                const mrp = medicine.mrp || 0;
                const offer = medicine.offer || 0;
                const discountedPrice = offer
                  ? Math.round(mrp - (mrp * offer) / 100)
                  : mrp;

                return (
                  <div
                    key={medicine._id}
                    className="bg-white rounded-[24px] p-4 md:p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={getImageUrl(image)}
                        alt={medicine.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-[18px]"
                        onError={(e) => { e.target.src = fallbackImage; }}
                      />

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <h2 className="text-xl font-bold text-gray-800">
                              {medicine.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                              {medicine.type || "Medicine"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {medicine.category || "General"}
                            </p>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-sm text-gray-400">Unit Price</p>
                            {offer ? (
                              <div className="flex flex-col items-end">
                                <span className="text-gray-400 line-through text-sm">
                                  ₹{mrp}
                                </span>
                                <span className="text-green-600 font-bold text-lg">
                                  ₹{discountedPrice}
                                </span>
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                                  {offer}% OFF
                                </span>
                              </div>
                            ) : (
                              <p className="text-lg font-bold text-green-600">
                                ₹{mrp}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(medicine._id, item.quantity - 1)
                              }
                              disabled={
                                actionLoading === medicine._id ||
                                item.quantity <= 1
                              }
                              className="w-10 h-10 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-50"
                            >
                              -
                            </button>

                            <span className="min-w-[30px] text-center font-semibold text-lg">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(medicine._id, item.quantity + 1)
                              }
                              disabled={actionLoading === medicine._id}
                              className="w-10 h-10 rounded-full border border-gray-300 text-lg font-bold disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Subtotal</p>
                              <p className="text-lg font-bold text-gray-800">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(medicine._id)}
                              disabled={actionLoading === medicine._id}
                              className="rounded-full bg-red-50 text-red-600 px-4 py-2 font-medium hover:bg-red-100 disabled:opacity-50"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Items</span>
                    <span>{cart.items.length}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Total Price</span>
                    <span>₹{cart.totalPrice}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                    <span>Grand Total</span>
                    <span className="text-green-600">₹{cart.totalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-5 rounded-full bg-orange-500 text-white py-3.5 font-semibold hover:bg-orange-600"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  disabled={actionLoading === "clear-cart"}
                  className="w-full mt-3 rounded-full border border-red-300 text-red-600 py-3 font-semibold hover:bg-red-50 disabled:opacity-50"
                >
                  {actionLoading === "clear-cart" ? "Clearing..." : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Cart;