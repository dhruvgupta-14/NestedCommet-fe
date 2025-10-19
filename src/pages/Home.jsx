import { useEffect, useState } from "react";
import Header from "../components/Header";
import Article from "../components/Article";
import CommentsSection from "../components/CommentSection";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { LoaderPinwheel } from "lucide-react";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getAllComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiKey}/getAllComments`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setComments(response.data.data);
        }
      } catch (e) {
        console.error(e);
        toast.error("Error fetching comments");
      }
      setLoading(false);
    };
    getAllComments();
  }, [apiKey]);

  return (
    <div className="relative min-h-screen">
       <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100"></div>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_1px,transparent_1px),linear-gradient(to_bottom,#f97316_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.12]"></div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-100 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-100 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
          <Article commentCount={comments.length} />
          {loading ? (
            <div className="flex justify-center py-12">
              <LoaderPinwheel
                size={48}
                className="text-orange-500 animate-spin"
              />
            </div>
          ) : (
            <CommentsSection comments={comments} />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
