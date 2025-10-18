import { Loader2, User } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!name.trim() || !email.includes("@") || password.length < 6) {
      toast.error("Please fill all fields correctly");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiKey}/signup`,
        { name, password, email, avatar },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
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

      <main className="flex-grow flex items-center justify-center px-4 md:px-0 my-6">
        <form
          className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6 md:p-8 flex flex-col gap-6"
          onSubmit={handleSignup}
        >
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 flex items-center justify-center mb-4">
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome</h1>
            <p className="text-gray-600">Sign up to join the discussion</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dhruv Gupta"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dhruvpahariya692@gmail.com"
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar (optional)</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-600 font-semibold">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-yellow-300 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
