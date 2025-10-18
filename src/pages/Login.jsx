import { Loader2, User } from "lucide-react";
import { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { refreshUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.includes("@") || password.length < 6) {
      toast.error("Please fill all fields correctly");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiKey}/login`, { email, password }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        await refreshUser();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center  justify-center px-4 md:px-0">
        <form
          className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6 md:p-8 flex flex-col gap-6"
          onSubmit={handleLogin}
        >
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 flex items-center justify-center mb-4">
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome Back</h1>
            <p className="text-gray-600">Sign in to join the discussion</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
              />
            </div>

            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-600 font-semibold">
                Register
              </Link>
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-300 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
