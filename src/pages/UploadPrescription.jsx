import { useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import api from "../api/api";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Please select a prescription file");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("prescription", file);
      formData.append("note", note);

      const { data } = await api.post("/prescriptions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        alert("Prescription uploaded successfully");
        setFile(null);
        setNote("");
        e.target.reset();
      } else {
        alert(data?.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pb-24 md:pb-0">
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[2rem] shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-2">Upload Prescription</h1>
          <p className="text-gray-500 mb-6">
            Upload your doctor’s prescription and admin will review it and suggest medicines.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border rounded-2xl px-4 py-4 bg-gray-50"
            />

            <textarea
              rows="4"
              placeholder="Write note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-2xl px-4 py-4 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Upload Prescription"}
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default UploadPrescription;