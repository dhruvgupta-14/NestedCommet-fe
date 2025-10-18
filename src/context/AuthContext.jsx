import { createContext,useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


export const AuthContext = createContext({
  name:"",
  avatar: "",
  loading:true,
  isLogin:false,
  role:"",
  refreshUser: async () => {},
});

export const AuthProvider = ({children}) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(true);
  const [isLogin,setIsLogin]=useState(false);
  const [name,setName]=useState("")
  const [avatar,setAvatar]=useState("")
  const [role,setRole]=useState("")
  const getMe = async () => {
    try {
      const response = await axios.get(`${apiKey}/me`, {
        withCredentials: true
      })
        if (!response.data.success) {
        toast.error("Please login to continue");
        setLoading(false)
        return
      }
      setName(response.data.name);
      setAvatar(response.data.avatar)
      setRole(response.data.role)
      setIsLogin(true)
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Please login to continue");
      setLoading(false)
      return
    }
    setLoading(false)
    };
    const logout = () => {
    setIsLogin(false);
    setName("");
    setAvatar("");

  };
  useEffect(() => {
    getMe();
  }, []);


  return (
    <AuthContext.Provider value={{isLogin,name,avatar,loading,refreshUser:getMe,logout,role}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;