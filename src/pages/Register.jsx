import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import api from "../api/api";

const Register = ({ isModal = false, switchToLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "user",
      });

      if (data?.success) {
        alert("Registration successful");
        switchToLogin?.();
        if (!isModal) navigate("/");
      } else {
        alert(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const formUI = (
    <div className={`${isModal ? "w-full" : "max-w-md mx-auto w-full"}`}>
      <div
        className={`bg-white rounded-2xl ${
          isModal ? "p-2" : "rounded-[32px] shadow-lg p-6 md:p-8 border border-gray-100"
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Join ApnaCare and order medicines easily
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-green-600 font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );

  if (isModal) return formUI;

  return (
    <div className="min-h-screen bg-[#fffaf4] pb-24 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">{formUI}</div>
      <BottomNav />
    </div>
  );
};

export default Register;