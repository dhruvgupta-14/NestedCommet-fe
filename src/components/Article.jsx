const Article = ({ commentCount }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 w-full">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4">
          FEATURED ARTICLE
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Building Scalable Nested Comment Systems
      </h2>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
        <span>📅 October 15, 2024</span>
        <span>•</span>
        <span>⏱️ 8 min read</span>
        <span>•</span>
        <span>💬 {commentCount} comments</span>
      </div>
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-full text-gray-700">
        <p>
          Nested commenting systems are essential for fostering meaningful discussions on digital platforms. 
          They allow users to respond directly to specific points, creating branching conversations that 
          maintain context and improve engagement.
        </p>
        <p>
          In this article, we explore the technical challenges of implementing a scalable nested comment 
          system, including performance optimization, user experience considerations, and accessibility best practices.
        </p>
      </div>
    </article>
  );
};

export default Article;
