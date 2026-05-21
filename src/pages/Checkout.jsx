



// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import BottomNav from "../components/BottomNav";
// import api from "../api/api";
// import CheckoutMap from "../components/CheckoutMap";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const lastReverseRequestRef = useRef(0);

//   const [cart, setCart] = useState({
//     items: [],
//     totalPrice: 0,
//   });

//   const [form, setForm] = useState({
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     landmark: "",
//     paymentMethod: "COD",
//     prescription: "",
//     location: {
//       lat: "",
//       lng: "",
//     },
//   });

//   const [loading, setLoading] = useState(true);
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [gettingLocation, setGettingLocation] = useState(false);
//   const [resolvingAddress, setResolvingAddress] = useState(false);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/cart/my");

//       if (data?.success) {
//         setCart(data.cart || { items: [], totalPrice: 0 });
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }
//     fetchCart();
//   }, []);

//   useEffect(() => {
//     if (!loading && cart?.items?.length === 0) {
//       alert("Your cart is empty");
//       navigate("/cart");
//     }
//   }, [loading, cart, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "lat" || name === "lng") {
//       setForm((prev) => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [name]: value,
//         },
//       }));
//       return;
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const fillAddressFromReverse = (data) => {
//     const address = data?.address || {};

//     const city =
//       address.city ||
//       address.town ||
//       address.village ||
//       address.municipality ||
//       address.suburb ||
//       "";

//     const state = address.state || "";
//     const pincode = address.postcode || "";
//     const landmark =
//       address.neighbourhood ||
//       address.suburb ||
//       address.road ||
//       address.hamlet ||
//       "";

//     setForm((prev) => ({
//       ...prev,
//       address: data?.display_name || prev.address,
//       city: city || prev.city,
//       state: state || prev.state,
//       pincode: pincode || prev.pincode,
//       landmark: landmark || prev.landmark,
//     }));
//   };

//   const reverseGeocode = async (lat, lng) => {
//     const now = Date.now();

//     if (now - lastReverseRequestRef.current < 1100) {
//       return;
//     }

//     lastReverseRequestRef.current = now;
//     setResolvingAddress(true);

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`
//       );

//       if (!response.ok) {
//         throw new Error("Reverse geocoding failed");
//       }

//       const data = await response.json();
//       fillAddressFromReverse(data);
//     } catch (error) {
//       console.error("Reverse geocoding error:", error);
//       alert("Location selected, but address auto-fill failed");
//     } finally {
//       setResolvingAddress(false);
//     }
//   };

//   const handleSelectLocation = async (lat, lng) => {
//     setForm((prev) => ({
//       ...prev,
//       location: {
//         lat: lat.toString(),
//         lng: lng.toString(),
//       },
//     }));

//     await reverseGeocode(lat, lng);
//   };

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported in this browser");
//       return;
//     }

//     setGettingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         await handleSelectLocation(
//           position.coords.latitude,
//           position.coords.longitude
//         );
//         setGettingLocation(false);
//       },
//       (error) => {
//         console.error("Location error:", error);
//         setGettingLocation(false);

//         if (error.code === 1) {
//           alert("Location permission denied");
//         } else if (error.code === 2) {
//           alert("Location unavailable");
//         } else if (error.code === 3) {
//           alert("Location request timed out");
//         } else {
//           alert("Failed to get current location");
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   // const handlePlaceOrder = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     if (!form.address || !form.phone) {
//   //       alert("Address and phone are required");
//   //       return;
//   //     }

//   //     setPlacingOrder(true);

//   //     const payload = {
//   //       paymentMethod: form.paymentMethod,
//   //       address: form.address,
//   //       city: form.city,
//   //       state: form.state,
//   //       pincode: form.pincode,
//   //       phone: form.phone,
//   //       landmark: form.landmark,
//   //       prescription: form.prescription,
//   //       location: {
//   //         lat: form.location.lat ? Number(form.location.lat) : null,
//   //         lng: form.location.lng ? Number(form.location.lng) : null,
//   //       },
//   //     };

//   //     const { data } = await api.post("/orders/place", payload);

//   //     if (data?.success) {
//   //       alert("Order placed successfully");
//   //       navigate("/my-orders");
//   //     } else {
//   //       alert(data?.message || "Failed to place order");
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     alert(error?.response?.data?.message || "Order placement failed");
//   //   } finally {
//   //     setPlacingOrder(false);
//   //   }
//   // };

//   const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "razorpay-script";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const handlePlaceOrder = async (e) => {
//   e.preventDefault();

//   if (!form.address || !form.phone) {
//     alert("Address and phone are required");
//     return;
//   }

//   const payload = {
//     address: form.address,
//     city: form.city,
//     state: form.state,
//     pincode: form.pincode,
//     phone: form.phone,
//     landmark: form.landmark,
//     prescription: form.prescription,
//     location: {
//       lat: form.location.lat ? Number(form.location.lat) : null,
//       lng: form.location.lng ? Number(form.location.lng) : null,
//     },
//   };

//   // COD flow — same as before
//   if (form.paymentMethod === "COD") {
//     try {
//       setPlacingOrder(true);
//       const { data } = await api.post("/orders/place", {
//         ...payload,
//         paymentMethod: "COD",
//       });
//       if (data?.success) {
//         alert("Order placed successfully");
//         navigate("/my-orders");
//       } else {
//         alert(data?.message || "Failed to place order");
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Order placement failed");
//     } finally {
//       setPlacingOrder(false);
//     }
//     return;
//   }

//   // ONLINE flow — Razorpay
//   try {
//     setPlacingOrder(true);

//     const scriptLoaded = await loadRazorpayScript();
//     if (!scriptLoaded) {
//       alert("Razorpay load nahi hua. Internet check karo.");
//       setPlacingOrder(false);
//       return;
//     }

//     // Step 1: Razorpay order create karo
//     const { data } = await api.post("/orders/payment/create", {
//       amount: cart.totalPrice,
//     });

//     if (!data?.success) {
//       alert("Payment initiate nahi hua");
//       setPlacingOrder(false);
//       return;
//     }

//     // Step 2: Razorpay popup kholo
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: data.currency,
//       name: "MediStore",
//       description: "Medicine Order Payment",
//       order_id: data.razorpayOrderId,
//       handler: async (response) => {
//         // Step 3: Verify karo aur order place karo
//         try {
//           const { data: verifyData } = await api.post("/orders/payment/verify", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             ...payload,
//           });

//           if (verifyData?.success) {
//             alert("Payment successful! Order placed.");
//             navigate("/my-orders");
//           } else {
//             alert(verifyData?.message || "Payment verify nahi hua");
//           }
//         } catch (err) {
//           alert(err?.response?.data?.message || "Payment verification failed");
//         }
//       },
//       prefill: {
//         contact: form.phone,
//       },
//       theme: {
//         color: "#16a34a",
//       },
//       modal: {
//         ondismiss: () => {
//           setPlacingOrder(false);
//         },
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     alert(error?.response?.data?.message || "Payment failed");
//     setPlacingOrder(false);
//   }
// };

//   const selectedLocation =
//     form.location.lat && form.location.lng
//       ? [Number(form.location.lat), Number(form.location.lng)]
//       : null;

//   return (
//     <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
//     {/* // <div className="min-h-screen overflow-y-auto bg-[#f6fff7] pb-24 md:pb-0"> */}
      

//       <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">
//         <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
//           <p className="text-sm text-green-100">Final Step</p>
//           <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
//             Checkout
//           </h1>
//           <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
//             Add delivery address and choose your payment method to place the
//             order.
//           </p>
//         </div>

//         {loading ? (
//           <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
//             <p className="text-lg font-semibold text-gray-700">
//               Loading checkout...
//             </p>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 mt-6">
//             <form
//               onSubmit={handlePlaceOrder}
//               className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm border border-gray-100"
//             >
//               <h2 className="text-2xl font-bold text-gray-800 mb-5">
//                 Delivery Details
//               </h2>

//               <button
//                 type="button"
//                 onClick={handleUseCurrentLocation}
//                 disabled={gettingLocation}
//                 className="w-full mb-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-700 px-4 py-3 font-semibold hover:bg-blue-100 disabled:opacity-70"
//               >
//                 {gettingLocation
//                   ? "Getting Current Location..."
//                   : "📍 Choose Your Current Location"}
//               </button>

//               <div className="mb-4">
//                 <CheckoutMap
//                   selectedLocation={selectedLocation}
//                   onSelectLocation={handleSelectLocation}
//                 />
//                 <p className="mt-2 text-xs text-gray-500">
//                   Map par click karke location select karo. Address auto-fill ho
//                   jayega.
//                 </p>
//                 {resolvingAddress && (
//                   <p className="mt-1 text-xs text-blue-600">
//                     Resolving address from selected location...
//                   </p>
//                 )}
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number *"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//                 <input
//                   type="text"
//                   name="pincode"
//                   placeholder="Pincode"
//                   value={form.pincode}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="mt-4">
//                 <textarea
//                   name="address"
//                   placeholder="Full Address *"
//                   value={form.address}
//                   onChange={handleChange}
//                   rows="4"
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4 mt-4">
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={form.city}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//                 <input
//                   type="text"
//                   name="state"
//                   placeholder="State"
//                   value={form.state}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="mt-4">
//                 <input
//                   type="text"
//                   name="landmark"
//                   placeholder="Landmark"
//                   value={form.landmark}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4 mt-4">
//                 <input
//                   type="number"
//                   name="lat"
//                   placeholder="Latitude (optional)"
//                   value={form.location.lat}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//                 <input
//                   type="number"
//                   name="lng"
//                   placeholder="Longitude (optional)"
//                   value={form.location.lng}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="mt-4">
//                 <input
//                   type="text"
//                   name="prescription"
//                   placeholder="Prescription path / note (optional)"
//                   value={form.prescription}
//                   onChange={handleChange}
//                   className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
//                 />
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-bold text-gray-800 mb-3">
//                   Payment Method
//                 </h3>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <label
//                     className={`rounded-2xl border p-4 cursor-pointer ${
//                       form.paymentMethod === "COD"
//                         ? "border-green-600 bg-green-50"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="COD"
//                       checked={form.paymentMethod === "COD"}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     Cash on Delivery
//                   </label>

//                   <label
//                     className={`rounded-2xl border p-4 cursor-pointer ${
//                       form.paymentMethod === "ONLINE"
//                         ? "border-orange-500 bg-orange-50"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="ONLINE"
//                       checked={form.paymentMethod === "ONLINE"}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     Pay Now
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={placingOrder}
//                 className="w-full mt-6 rounded-full bg-orange-500 text-white py-3.5 font-semibold hover:bg-orange-600 disabled:opacity-70"
//               >
//                 {placingOrder ? "Placing Order..." : "Place Order"}
//               </button>
//             </form>

//             <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 h-fit sticky top-24">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Order Summary
//               </h2>

//               <div className="mt-5 space-y-4">
//                 {cart.items.map((item) => (
//                   <div
//                     key={item.medicine?._id}
//                     className="flex items-center justify-between gap-3 border-b pb-3"
//                   >
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {item.medicine?.name}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="font-bold text-green-600">
//                       ₹{item.price * item.quantity}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 border-t pt-4">
//                 <div className="flex justify-between text-lg font-bold text-gray-800">
//                   <span>Total</span>
//                   <span className="text-green-600">₹{cart.totalPrice}</span>
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

// export default Checkout;







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import api from "../api/api";
import CheckoutMap from "../components/CheckoutMap";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
    totalPrice: 0,
  });

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    landmark: "",
    paymentMethod: "COD",
    prescription: "",
    location: {
      lat: "",
      lng: "",
    },
  });

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [resolvingAddress, setResolvingAddress] = useState(false);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/cart/my");

      if (data?.success) {
        setCart(data.cart || { items: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTH CHECK =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetchCart();
  }, []);

  // ================= EMPTY CART =================
  useEffect(() => {
    if (!loading && cart?.items?.length === 0) {
      alert("Your cart is empty");
      navigate("/cart");
    }
  }, [loading, cart, navigate]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= AUTO FILL ADDRESS =================
  const fillAddressFromReverse = (data) => {
    const address = data?.address || {};

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      "";

    const state = address.state || "";

    const pincode = address.postcode || "";

    const landmark =
      address.neighbourhood ||
      address.road ||
      address.suburb ||
      "";

    setForm((prev) => ({
      ...prev,
      address: data?.display_name || "",
      city,
      state,
      pincode,
      landmark,
    }));
  };

  // ================= REVERSE GEOCODE =================
  const reverseGeocode = async (lat, lng) => {
    setResolvingAddress(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`
      );

      if (!response.ok) {
        throw new Error("Reverse geocoding failed");
      }

      const data = await response.json();

      fillAddressFromReverse(data);
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      alert("Location selected, but address auto-fill failed");
    } finally {
      setResolvingAddress(false);
    }
  };

  // ================= SELECT LOCATION =================
  const handleSelectLocation = async (lat, lng) => {
    console.log("Selected Location:", lat, lng);

    setForm((prev) => ({
      ...prev,
      location: {
        lat: lat.toString(),
        lng: lng.toString(),
      },
    }));

    await reverseGeocode(lat, lng);
  };

  // ================= CURRENT LOCATION =================
 const handleUseCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported");
    return;
  }

  setGettingLocation(true);

  const watchId = navigator.geolocation.watchPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("LIVE LOCATION:", lat, lng);

      // stop watching after getting latest location
      navigator.geolocation.clearWatch(watchId);

      setForm((prev) => ({
        ...prev,
        location: {
          lat: lat.toString(),
          lng: lng.toString(),
        },
      }));

      await reverseGeocode(lat, lng);

      setGettingLocation(false);

      alert("Current location updated");
    },

    (error) => {
      console.error(error);

      setGettingLocation(false);

      if (error.code === 1) {
        alert("Location permission denied");
      } else if (error.code === 2) {
        alert("Location unavailable");
      } else if (error.code === 3) {
        alert("Location timeout");
      } else {
        alert("Failed to get location");
      }
    },

    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    }
  );
};
  // ================= LOAD RAZORPAY =================
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!form.address || !form.phone) {
      alert("Address and phone are required");
      return;
    }

    const payload = {
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      phone: form.phone,
      landmark: form.landmark,
      prescription: form.prescription,

      location: {
        lat: form.location.lat
          ? Number(form.location.lat)
          : null,

        lng: form.location.lng
          ? Number(form.location.lng)
          : null,
      },
    };

    // ================= COD =================
    if (form.paymentMethod === "COD") {
      try {
        setPlacingOrder(true);

        const { data } = await api.post("/orders/place", {
          ...payload,
          paymentMethod: "COD",
        });

        if (data?.success) {
          alert("Order placed successfully");
          navigate("/my-orders");
        } else {
          alert(data?.message || "Failed to place order");
        }
      } catch (error) {
        console.error(error);

        alert(
          error?.response?.data?.message ||
            "Order placement failed"
        );
      } finally {
        setPlacingOrder(false);
      }

      return;
    }

    // ================= ONLINE PAYMENT =================
    try {
      setPlacingOrder(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Razorpay failed to load");
        setPlacingOrder(false);
        return;
      }

      const { data } = await api.post(
        "/orders/payment/create",
        {
          amount: cart.totalPrice,
        }
      );

      if (!data?.success) {
        alert("Payment initiate failed");
        setPlacingOrder(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "MediStore",

        description: "Medicine Order Payment",

        order_id: data.razorpayOrderId,

        handler: async (response) => {
          try {
            const { data: verifyData } =
              await api.post(
                "/orders/payment/verify",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  ...payload,
                }
              );

            if (verifyData?.success) {
              alert(
                "Payment successful! Order placed."
              );

              navigate("/my-orders");
            } else {
              alert(
                verifyData?.message ||
                  "Payment verification failed"
              );
            }
          } catch (err) {
            console.error(err);

            alert(
              err?.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        prefill: {
          contact: form.phone,
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: () => {
            setPlacingOrder(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Payment failed"
      );

      setPlacingOrder(false);
    }
  };

  // ================= MAP LOCATION =================
  const selectedLocation =
    form.location.lat && form.location.lng
      ? [
          Number(form.location.lat),
          Number(form.location.lng),
        ]
      : null;

  return (
    <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
      {/* <Navbar /> */}

      <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">

        {/* HEADER */}
        <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
          <p className="text-sm text-green-100">
            Final Step
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
            Checkout
          </h1>

          <p className="mt-2 text-sm md:text-base text-green-50">
            Add delivery address and choose your payment method.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-[24px] p-8 text-center mt-6">
            Loading checkout...
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 mt-6">

            {/* LEFT */}
            <form
              onSubmit={handlePlaceOrder}
              className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm border"
            >
              <h2 className="text-2xl font-bold mb-5">
                Delivery Details
              </h2>

              {/* CURRENT LOCATION */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={gettingLocation}
                className="w-full mb-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-700 px-4 py-3 font-semibold"
              >
                {gettingLocation
                  ? "Getting Current Location..."
                  : "📍 Choose Current Location"}
              </button>

              {/* MAP */}
              <div className="mb-4">
                <CheckoutMap
                  selectedLocation={selectedLocation}
                  onSelectLocation={
                    handleSelectLocation
                  }
                />

                <p className="mt-2 text-xs text-gray-500">
                  Map par click karke location select
                  karo.
                </p>

                {resolvingAddress && (
                  <p className="text-xs text-blue-600 mt-1">
                    Resolving address...
                  </p>
                )}
              </div>

              {/* PHONE + PINCODE */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* ADDRESS */}
              <div className="mt-4">
                <textarea
                  name="address"
                  placeholder="Full Address *"
                  value={form.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* CITY + STATE */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* LANDMARK */}
              <div className="mt-4">
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  value={form.landmark}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* LAT LNG */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <input
                  type="number"
                  name="lat"
                  placeholder="Latitude"
                  value={form.location.lat}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />

                <input
                  type="number"
                  name="lng"
                  placeholder="Longitude"
                  value={form.location.lng}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* PRESCRIPTION */}
              <div className="mt-4">
                <input
                  type="text"
                  name="prescription"
                  placeholder="Prescription"
                  value={form.prescription}
                  onChange={handleChange}
                  className="w-full rounded-2xl border px-4 py-3"
                />
              </div>

              {/* PAYMENT */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">
                  Payment Method
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">

                  <label className="rounded-2xl border p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={
                        form.paymentMethod === "COD"
                      }
                      onChange={handleChange}
                      className="mr-2"
                    />

                    Cash on Delivery
                  </label>

                  <label className="rounded-2xl border p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={
                        form.paymentMethod ===
                        "ONLINE"
                      }
                      onChange={handleChange}
                      className="mr-2"
                    />

                    Pay Online
                  </label>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={placingOrder}
                className="w-full mt-6 rounded-full bg-orange-500 text-white py-3.5 font-semibold"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>
            </form>

            {/* RIGHT */}
            <div className="bg-white rounded-[24px] p-5 shadow-sm border h-fit sticky top-24">

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">

                {cart.items.map((item) => (
                  <div
                    key={item.medicine?._id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {item.medicine?.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-green-600">
                      ₹
                      {item.price *
                        item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span className="text-green-600">
                    ₹{cart.totalPrice}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Checkout;