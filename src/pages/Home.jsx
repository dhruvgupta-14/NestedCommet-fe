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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Article commentCount={comments.length} />

        {loading ? (
          <div className="flex justify-center py-12">
            <LoaderPinwheel size={48} className="text-blue-500 animate-spin" />
          </div>
        ) : (
          <CommentsSection comments={comments} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
