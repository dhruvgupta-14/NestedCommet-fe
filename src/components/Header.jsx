import { LogOut } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const { isLogin, avatar, name, logout } = useContext(AuthContext);
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await axios.post(`${apiKey}/logout`, {}, { withCredentials: true });
      if (response.data.success) toast.success(response.data.message);
      logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="bg-gray-50 shadow-md border-b border-gray-200 sticky top-0 z-20 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-1">
          <span className="text-3xl font-light bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">N</span>
          ested
          <span className="text-3xl font-light bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">C</span>
          omment
        </h1>

        {isLogin && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-700 font-semibold">{name[0]}</span>
              )}
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-100 border border-orange-400 hover:border-red-700 rounded-xl text-sm md:text-base transition-colors duration-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

