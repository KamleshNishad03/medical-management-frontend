

// import { useEffect, useState } from "react";
// import api from "../api/api";

// const BASE_URL = "http://localhost:5000";

// const emptyForm = {
//   name: "",
//   type: "",
//   category: "",
//   brand: "",
//   price: "",
//   stock: "",
//   description: "",
//   expiryDate: "",
//   prescriptionRequired: false,
//   offer: "",
// };

// const AdminMedicines = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [search, setSearch] = useState("");

//   const [form, setForm] = useState(emptyForm);
//   const [images, setImages] = useState([null]);
//   const [preview, setPreview] = useState([null]);

//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const resetModalState = () => {
//     setShowModal(false);
//     setEditing(null);
//     setForm(emptyForm);
//     setImages([null]);
//     setPreview([null]);
//   };

//   const fetchMedicines = async () => {
//     try {
//       const { data } = await api.get(`/medicines/all?keyword=${search}`);
//       setMedicines(data.medicines || []);
//     } catch (error) {
//       alert("Failed to fetch medicines");
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//   }, [search]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newImages = [...images];
//     newImages[index] = file;
//     setImages(newImages);

//     const newPreviews = [...preview];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreview(newPreviews);
//   };

//   // const addImageSlot = () => {
//   //   setImages((prev) => [...prev, null]);
//   //   setPreview((prev) => [...prev, null]);
//   // };
//   const addImageSlot = () => {
//     if (images.length >= 3) return;
//     setImages((prev) => [...prev, null]);
//     setPreview((prev) => [...prev, null]);
//   };

//   const removeImageSlot = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setPreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   const discountedPrice =
//     form.price && form.offer
//       ? Math.round(form.price - (form.price * form.offer) / 100)
//       : form.price;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       Object.keys(form).forEach((key) => {
//         formData.append(key, form[key]);
//       });

//       images.forEach((img) => {
//         if (img) formData.append("images", img);
//       });

//       if (editing) {
//         await api.put(`/medicines/update/${editing._id}`, formData);
//         alert("Updated successfully");
//       } else {
//         await api.post("/medicines/create", formData);
//         alert("Medicine added successfully");
//       }

//       resetModalState();
//       fetchMedicines();
//     } catch (error) {
//       alert(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleEdit = (m) => {
//     setEditing(m);
//     setForm({
//       name: m.name || "",
//       type: m.type || "",
//       category: m.category || "",
//       brand: m.brand || "",
//       price: m.price || "",
//       stock: m.stock || "",
//       description: m.description || "",
//       expiryDate: m.expiryDate?.slice(0, 10) || "",
//       prescriptionRequired: m.prescriptionRequired || false,
//       offer: m.offer || "",
//     });
//     setImages([null]);
//     setPreview([null]);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this medicine?")) return;
//     await api.delete(`/medicines/delete/${id}`);
//     fetchMedicines();
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-5">
//         <h1 className="text-2xl font-bold">Manage Medicines</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded-lg"
//         >
//           + Add Medicine
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="Search..."
//         className="w-full border p-3 rounded-lg mb-5"
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {medicines.map((m) => {
//           const originalPrice = m.offer
//             ? Math.round(m.price / (1 - m.offer / 100))
//             : m.price;

//           return (
//             <div
//               key={m._id}
//               className="bg-white p-3 rounded-xl shadow hover:shadow-xl transition"
//             >
//               {m.images?.length > 0 && (
//                 <img
//                   src={`${BASE_URL}/${m.images[0].replace(/\\/g, "/")}`}
//                   alt={m.name}
//                   className="h-32 w-full object-cover rounded"
//                 />
//               )}

//               <h2 className="font-bold mt-2">{m.name}</h2>

//               <div className="mt-1 flex items-center gap-2 flex-wrap">
//                 {m.offer ? (
//                   <>
//                     <span className="text-gray-400 line-through text-sm">
//                       ₹{originalPrice}
//                     </span>
//                     <span className="text-green-600 font-bold">₹{m.price}</span>
//                     <span className="text-xs bg-green-100 text-green-700 px-2 rounded">
//                       {m.offer}% OFF
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-green-600 font-bold">₹{m.price}</span>
//                 )}
//               </div>

//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() => handleEdit(m)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(m._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
//           onClick={resetModalState}
//         >
//           <div
//             className="bg-white p-5 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-xl font-bold mb-3">
//               {editing ? "Edit" : "Add"} Medicine
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 name="name"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />
//               <input
//                 name="type"
//                 placeholder="Type"
//                 value={form.type}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />
//               <input
//                 name="category"
//                 placeholder="Category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />
//               <input
//                 name="brand"
//                 placeholder="Brand"
//                 value={form.brand}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />

//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   name="price"
//                   type="number"
//                   placeholder="Price"
//                   value={form.price}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                 />
//                 <input
//                   name="offer"
//                   type="number"
//                   placeholder="Offer %"
//                   value={form.offer}
//                   onChange={handleChange}
//                   className="border p-2 rounded"
//                 />
//               </div>

//               {form.price && form.offer && (
//                 <div className="text-sm">
//                   <span className="line-through text-gray-400 mr-2">
//                     ₹{form.price}
//                   </span>
//                   <span className="text-green-600 font-bold mr-2">
//                     ₹{discountedPrice}
//                   </span>
//                   <span className="text-red-500">{form.offer}% OFF</span>
//                 </div>
//               )}

//               <input
//                 name="stock"
//                 type="number"
//                 placeholder="Stock"
//                 value={form.stock}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />
//               <input
//                 name="expiryDate"
//                 type="date"
//                 value={form.expiryDate}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="border p-2 w-full rounded"
//                 rows={3}
//               />

//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   name="prescriptionRequired"
//                   checked={form.prescriptionRequired}
//                   onChange={handleChange}
//                 />
//                 Prescription Required
//               </label>

//               {/* Images Section */}
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Images
//                 </label>

//                 {preview.map((src, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageChange(e, index)}
//                       className="border p-2 w-full rounded text-sm"
//                     />
//                     {src && (
//                       <img
//                         src={src}
//                         alt={`preview-${index}`}
//                         className="w-12 h-12 object-cover rounded flex-shrink-0"
//                       />
//                     )}
//                     <button
//                       type="button"
//                       onClick={() => removeImageSlot(index)}
//                       className="text-red-500 font-bold text-lg flex-shrink-0"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}

//                 {/* <button
//                   type="button"
//                   onClick={addImageSlot}
//                   className="text-green-600 font-semibold text-sm"
//                 >
//                   + Add More Image
//                 </button> */}

//                 <button
//                   type="button"
//                   onClick={addImageSlot}
//                   disabled={images.length >= 3}
//                   className={`font-semibold text-sm ${
//                     images.length >= 3
//                       ? "text-gray-400 cursor-not-allowed"
//                       : "text-green-600"
//                   }`}
//                 >
//                   + Add More Image
//                 </button>
//               </div>

//               <button className="bg-green-600 text-white w-full py-2 rounded">
//                 {editing ? "Update" : "Save"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminMedicines;


import { useEffect, useState } from "react";
import api from "../api/api";

const emptyForm = {
  name: "",
  type: "",
  category: "",
  brand: "",
  mrp: "",
  stock: "",
  description: "",
  expiryDate: "",
  prescriptionRequired: false,
  offer: "",
};

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([null]);
  const [preview, setPreview] = useState([null]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const resetModalState = () => {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
    setImages([null]);
    setPreview([null]);
  };

  const fetchMedicines = async () => {
    try {
      const { data } = await api.get(`/medicines/all?keyword=${search}`);
      setMedicines(data.medicines || []);
    } catch (error) {
      alert("Failed to fetch medicines");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreviews = [...preview];
    newPreviews[index] = URL.createObjectURL(file);
    setPreview(newPreviews);
  };

  const addImageSlot = () => {
    if (images.length >= 3) return;

    setImages((prev) => [...prev, null]);
    setPreview((prev) => [...prev, null]);
  };

  const removeImageSlot = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const discountedPrice =
    form.mrp && form.offer
      ? Math.round(form.mrp - (form.mrp * form.offer) / 100)
      : form.mrp;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        if (img) {
          formData.append("images", img);
        }
      });

      if (editing) {
        await api.put(`/medicines/update/${editing._id}`, formData);

        alert("Updated successfully");
      } else {
        await api.post("/medicines/create", formData);

        alert("Medicine added successfully");
      }

      resetModalState();
      fetchMedicines();
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (m) => {
    setEditing(m);

    setForm({
      name: m.name || "",
      type: m.type || "",
      category: m.category || "",
      brand: m.brand || "",
      mrp: m.mrp || "",
      stock: m.stock || "",
      description: m.description || "",
      expiryDate: m.expiryDate?.slice(0, 10) || "",
      prescriptionRequired: m.prescriptionRequired || false,
      offer: m.offer || "",
    });

    setImages([null]);
    setPreview([null]);

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    await api.delete(`/medicines/delete/${id}`);

    fetchMedicines();
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Manage Medicines</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Medicine
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="w-full border p-3 rounded-lg mb-5"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {medicines.map((m) => {
          const discounted = m.offer
            ? Math.round(m.mrp - (m.mrp * m.offer) / 100)
            : null;

          return (
            <div
              key={m._id}
              className="bg-white p-3 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="relative">
                {m.images?.length > 0 && (
                  <img
                    src={m.images[0]}
                    alt={m.name}
                    className="h-32 w-full object-cover rounded"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                )}

                {m.offer ? (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {m.offer}% OFF
                  </div>
                ) : null}
              </div>

              <h2 className="font-bold mt-2">{m.name}</h2>

              <div className="mt-1 flex items-center gap-2 flex-wrap">
                {m.offer ? (
                  <>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{m.mrp}
                    </span>

                    <span className="text-green-600 font-bold">
                      ₹{discounted}
                    </span>

                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      {m.offer}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-green-600 font-bold">
                    ₹{m.mrp}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={resetModalState}
        >
          <div
            className="bg-white p-5 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3">
              {editing ? "Edit" : "Add"} Medicine
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <input
                name="type"
                placeholder="Type"
                value={form.type}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <input
                name="brand"
                placeholder="Brand"
                value={form.brand}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  name="mrp"
                  type="number"
                  placeholder="MRP"
                  value={form.mrp}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  name="offer"
                  type="number"
                  placeholder="Offer %"
                  value={form.offer}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              </div>

              {form.mrp && form.offer && (
                <div className="text-sm bg-orange-50 p-2 rounded flex items-center gap-2">
                  <span className="line-through text-gray-400">
                    ₹{form.mrp}
                  </span>

                  <span className="text-green-600 font-bold">
                    ₹{discountedPrice}
                  </span>

                  <span className="text-orange-500 font-semibold">
                    {form.offer}% OFF
                  </span>
                </div>
              )}

              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <input
                name="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows={3}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="prescriptionRequired"
                  checked={form.prescriptionRequired}
                  onChange={handleChange}
                />

                Prescription Required
              </label>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Images
                </label>

                {preview.map((src, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                      className="border p-2 w-full rounded text-sm"
                    />

                    {src && (
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-12 h-12 object-cover rounded flex-shrink-0"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeImageSlot(index)}
                      className="text-red-500 font-bold text-lg flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addImageSlot}
                  disabled={images.length >= 3}
                  className={`font-semibold text-sm ${
                    images.length >= 3
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600"
                  }`}
                >
                  + Add More Image
                </button>
              </div>

              <button className="bg-green-600 text-white w-full py-2 rounded">
                {editing ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMedicines;