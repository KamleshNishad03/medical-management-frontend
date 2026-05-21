import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = ({ isModal = false, onClose, switchToRegister }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
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

      const { data } = await api.post("/auth/login", form);

      if (data?.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user?.role);

        alert("Login successful");

        if (onClose) onClose();

        if (data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/medicines");
        }

        window.location.reload();
      } else {
        alert(data?.message || "Login failed");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isModal ? "w-full" : "w-full max-w-md mx-auto"}`}>
      <div className="bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          Login to <span className="text-green-600">ApnaCare</span>
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="text-green-600 font-semibold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;