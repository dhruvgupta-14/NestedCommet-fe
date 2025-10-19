import { useContext, useState } from "react";
import { ChevronDown, ChevronUp, ThumbsUp, Trash } from "lucide-react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const CommentComponent = ({ comment, level = 0 }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
  const [seeChildren, setSeeChildren] = useState(false);
  const {role}=useContext(AuthContext)
  console.log(comment)
  const deleteComment=async()=>{
    try{
      const response=await axios.delete(`${apiKey}/delete/comment/${comment._id}`, {
        withCredentials: true
      })
      if(response.data.success){
        toast.success("Successfully Deleted")
        window.location.reload()
      }
    }catch(e){
      console.log(e)
      toast.error("Something Went Wrong")
    }
  }
  return (
    <div
      className={`p-3 sm:p-4 rounded-xl my-2 transition-all duration-200 ${
        level === 0 ? "bg-white shadow-sm border border-gray-200" : "bg-gray-50"
      }`}
      style={{ marginLeft: `${level * 20}px` }}
    >
      {/* Comment header */}
      <div className="flex items-start gap-2 sm:gap-3">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-gray-300"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">{comment.user.name}</p>
              {role==="admin"&&<Trash size={18} className="cursor-pointer hover:text-red-500" onClick={deleteComment} />}
            </div>
           
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-800 text-sm sm:text-base mt-1 leading-snug">{comment.text}</p>

          {/* Like and reply count */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <ThumbsUp size={14} /> {comment.upvotes}
            </button>

            {comment.children?.length > 0 && (
              <button
                onClick={() => setSeeChildren(!seeChildren)}
                className="flex items-center gap-1 text-blue-500 hover:bg-blue-100 px-2 py-1 rounded-lg transition-all"
              >
                {seeChildren ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {comment.children.length} {comment.children.length > 1 ? "Replies" : "Reply"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested children */}
      {seeChildren && comment.children?.length > 0 && (
        <div className="mt-3 border-l border-gray-200">
          {comment.children.map((child, i) => (
            <CommentComponent key={i} comment={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;

