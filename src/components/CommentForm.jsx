const CommentForm = ({ 
  currentUser, 
  value, 
  onChange, 
  onSubmit, 
  onCancel, 
  placeholder = "Share your thoughts...",
  isReply = false 
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      {!isReply && (
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xl">
            {currentUser?.avatar}
          </div>
          <span className="font-semibold text-gray-900">{currentUser?.name}</span>
        </div>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        rows={isReply ? "3" : "4"}
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          {isReply ? 'Submit' : 'Post Comment'}
        </button>
        {isReply && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
export default CommentForm