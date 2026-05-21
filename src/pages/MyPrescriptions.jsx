import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import api from "../api/api";

const getFileUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setPageError("");

      const { data } = await api.get("/prescriptions/my");

      if (data?.success) {
        setPrescriptions(data.prescriptions || []);
      } else {
        setPrescriptions([]);
      }
    } catch (error) {
      console.error(error);
      setPageError(
        error?.response?.data?.message || "Failed to load prescriptions"
      );
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fff7] pb-24 md:pb-0">
      {/* <Navbar /> */}

      <main className="max-w-6xl mx-auto px-4 py-5 md:py-8">
        <div className="rounded-[28px] bg-gradient-to-br from-green-600 to-green-500 text-white p-5 md:p-8 shadow-lg">
          <p className="text-sm text-green-100">Prescription History</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
            My Prescriptions
          </h1>
          <p className="mt-2 text-sm md:text-base text-green-50 max-w-2xl">
            View uploaded prescriptions and admin review status.
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-lg font-semibold text-gray-700">
              Loading prescriptions...
            </p>
          </div>
        )}

        {!loading && pageError && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-lg font-semibold text-red-600">{pageError}</p>
          </div>
        )}

        {!loading && !pageError && prescriptions.length === 0 && (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 text-center mt-6">
            <p className="text-xl font-semibold text-gray-800">
              No prescriptions uploaded yet
            </p>
          </div>
        )}

        {!loading && !pageError && prescriptions.length > 0 && (
          <div className="space-y-5 mt-6">
            {prescriptions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="lg:w-64">
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
                        className="w-full h-56 object-cover rounded-2xl border"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Prescription Request
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Note: {item.note || "No note added"}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                          statusColors[item.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Admin Comment</p>
                        <p className="text-gray-700 font-medium">
                          {item.adminComment || "Not reviewed yet"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400">
                          Suggested Medicines
                        </p>
                        {item.suggestedMedicines?.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.suggestedMedicines.map((med, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 text-sm"
                              >
                                {med}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No suggestions yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyPrescriptions;