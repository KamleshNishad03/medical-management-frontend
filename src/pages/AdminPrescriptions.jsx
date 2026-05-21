

import { useEffect, useState } from "react";
import api from "../api/api";

const getFileUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
};

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({});

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/prescriptions/all");
      if (data?.success) {
        setPrescriptions(data.prescriptions || []);
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleChange = (id, field, value) => {
    setReviewForm((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleReview = async (id) => {
    try {
      const formData = reviewForm[id] || {};

      const payload = {
        suggestedMedicines: formData.suggestedMedicines
          ? formData.suggestedMedicines
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        adminComment: formData.adminComment || "",
        status: formData.status || "Reviewed",
      };

      const { data } = await api.put(`/prescriptions/review/${id}`, payload);

      if (data?.success) {
        alert("Prescription reviewed successfully");
        fetchPrescriptions();
      } else {
        alert(data?.message || "Review failed");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Review failed");
    }
  };

  return (
    <div>
      <div className="rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 md:p-8 shadow-lg">
        <p className="text-sm text-orange-100">Admin Panel</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
          Review Prescriptions
        </h1>
      </div>

      {loading ? (
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
          Loading prescriptions...
        </div>
      ) : (
        <div className="space-y-5 mt-6">
          {prescriptions.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
            >
              <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-5">
                <div>
                  <p className="font-bold text-gray-800">
                    {item.user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.user?.email || ""}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {item.user?.phone || ""}
                  </p>

                  {item.image?.endsWith(".pdf") ? (
                    <a
                      href={getFileUrl(item.image)}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-2xl bg-red-50 border border-red-100 p-6 text-center text-red-600 font-semibold"
                    >
                      Open PDF
                    </a>
                  ) : (
                    <img
                      src={getFileUrl(item.image)}
                      alt="Prescription"
                      className="w-full h-64 object-cover rounded-2xl border"
                    />
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">User Note</p>
                    <p className="text-gray-700 font-medium">
                      {item.note || "No note added"}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <input
                      type="text"
                      placeholder="Suggested medicines (comma separated)"
                      defaultValue={item.suggestedMedicines?.join(", ") || ""}
                      onChange={(e) =>
                        handleChange(item._id, "suggestedMedicines", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
                    />

                    <textarea
                      rows="4"
                      placeholder="Admin comment"
                      defaultValue={item.adminComment || ""}
                      onChange={(e) =>
                        handleChange(item._id, "adminComment", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
                    />

                    <select
                      defaultValue={item.status || "Reviewed"}
                      onChange={(e) =>
                        handleChange(item._id, "status", e.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
                    >
                      <option value="Reviewed">Reviewed</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>

                    <button
                      onClick={() => handleReview(item._id)}
                      className="rounded-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {prescriptions.length === 0 && (
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center">
              No prescriptions found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptions;