import { useState } from "react";
import { MessageSquare } from "lucide-react";
import CommentComponent from "./CommentComponent";

const CommentsSection = ({ comments }) => {
  const [sortBy, setSortBy] = useState("default");

  const sortComments = (commentsList) => {
    return commentsList
      .map(comment => ({
        ...comment,
        children: comment.children ? sortComments(comment.children) : [],
      }))
      .sort((a, b) => {
        if (sortBy === "upvotes") return b.upvotes - a.upvotes;
        if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
        return 0;
      });
  };

  const sortedComments = sortComments(comments);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare />
          {comments.length} Comments
        </h3>

        <select
          className="border border-gray-300 rounded-lg p-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="upvotes">Most Upvotes</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          sortedComments.map((comment, index) => (
            <CommentComponent key={index} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;


