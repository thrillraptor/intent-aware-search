import { useQuery, useMutation } from "@tanstack/react-query";
import { postServices } from "./posts.api";
import { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  Calendar,
  Loader2,
  RefreshCw,
  Search,
  X,
  BookOpen,
  TrendingUp,
  Sparkles,
  Zap,
} from "lucide-react";

export default function PostPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Fetch all posts
  const {
    data: postsData,
    error: postsError,
    isLoading: isLoadingPosts,
    isError: isPostsError,
    refetch: refetchPosts,
    isRefetching: isRefetchingPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await postServices.getPosts();
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: (query) =>
      postServices.searchPosts({ searchQuery: query, topK: 10 }),
  });

  // Debounce search query
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setDebouncedQuery(searchQuery.trim());
        searchMutation.mutate(searchQuery.trim());
      } else {
        setDebouncedQuery("");
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Determine which data to display
  const displayData = debouncedQuery
    ? searchMutation.data?.data?.results || []
    : postsData?.posts || [];

  // Safe check for loading states
  const isLoading = debouncedQuery
    ? searchMutation.isPending && !searchMutation.data
    : isLoadingPosts && !postsData;

  // Safe post data access
  const getPostDate = (post) => {
    return post.createdAt || post.date || new Date().toISOString();
  };

  const getPostTags = (post) => {
    return post.tags || [];
  };

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "Date not available";
    }
  };

  // Format relevance score for search results
  const formatRelevanceScore = (score) => {
    if (typeof score !== "number") return "";
    return `${(score * 100).toFixed(0)}%`;
  };

  // Get relevance color based on score
  const getRelevanceColor = (score) => {
    if (score >= 0.8) return "from-emerald-500 to-green-600";
    if (score >= 0.6) return "from-blue-500 to-cyan-600";
    if (score >= 0.4) return "from-amber-500 to-orange-600";
    if (score >= 0.2) return "from-rose-500 to-pink-600";
    return "from-slate-500 to-gray-600";
  };

  // Open modal with full post
  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  // Handle refresh
  const handleRefresh = () => {
    if (debouncedQuery) {
      searchMutation.mutate(debouncedQuery);
    } else {
      refetchPosts();
    }
  };

  // Check if there are no posts at all
  const hasNoPosts =
    !debouncedQuery && (!postsData?.posts || postsData.posts.length === 0);
  const hasNoSearchResults =
    debouncedQuery && displayData.length === 0 && !searchMutation.isPending;
  const hasSearchError = debouncedQuery && searchMutation.isError;

  // Loading skeleton
  if (isLoading && !displayData.length) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"></div>
        <div className="max-w-7xl mx-auto relative">
          {/* Header skeleton */}
          <div className="mb-12">
            <div className="h-12 w-80 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Search skeleton */}
          <div className="mb-12">
            <div className="h-14 w-full max-w-2xl bg-slate-800 rounded-2xl animate-pulse"></div>
          </div>

          {/* Posts grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-slate-800 rounded mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state - ONLY for initial posts loading failure
  if (isPostsError && !postsData && !debouncedQuery) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,100,100,0.1),transparent_50%)]"></div>

        <div className="max-w-2xl w-full relative">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-10 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl shadow-lg">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Unable to Connect
                </h2>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  {postsError?.message ||
                    "We couldn't fetch the posts. This might be a temporary network issue or the server might be unavailable."}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleRefresh}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Try Again
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 border-2 border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold py-4 px-6 rounded-xl transition-all duration-200"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.1),transparent_25%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.1),transparent_25%)]"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  {debouncedQuery ? "Search Results" : "Discover Posts"}
                </h1>
              </div>
              <p className="text-slate-400 text-lg ml-14">
                {debouncedQuery
                  ? `Found ${displayData.length} ${displayData.length === 1 ? "result" : "results"} for "${debouncedQuery}"`
                  : "Explore insights, stories, and ideas from the community"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={searchMutation.isPending || isRefetchingPosts}
                className="group relative overflow-hidden bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium py-3 px-5 rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {searchMutation.isPending || isRefetchingPosts ? (
                  <Loader2 className="h-5 w-5 animate-spin relative z-10" />
                ) : (
                  <RefreshCw className="h-5 w-5 relative z-10" />
                )}
                <span className="relative z-10 hidden sm:inline">Refresh</span>
              </button>

              <div className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg">
                {displayData.length}{" "}
                {displayData.length === 1 ? "Post" : "Posts"}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center px-6 py-4">
                <Search className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for posts..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="ml-3 p-2 hover:bg-slate-800 rounded-lg transition-colors group flex-shrink-0"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
                  </button>
                )}
              </div>

              {/* Search Loading Indicator */}
              {debouncedQuery && searchMutation.isPending && (
                <div className="px-6 pb-4 flex items-center gap-3 text-sm text-violet-400 border-t border-slate-800/50 pt-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching posts...</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Search Error State - Inline */}
        {hasSearchError && (
          <div className="mb-8 bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-xl flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-rose-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Search Error
                </h3>
                <p className="text-slate-300 mb-4">
                  {searchMutation.error?.message ||
                    "Unable to complete search. Please check your connection and try again."}
                </p>
                <button
                  onClick={() => searchMutation.mutate(debouncedQuery)}
                  className="bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Posts Banner */}
        {hasNoPosts && (
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5"></div>
            <div className="relative max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-6">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No Posts Yet
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Be the first to share your thoughts and spark the conversation!
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-2xl hover:shadow-violet-500/25 hover:scale-105"
              >
                <RefreshCw className="h-5 w-5" />
                Check for New Posts
              </button>
            </div>
          </div>
        )}

        {/* No Search Results */}
        {hasNoSearchResults && !hasSearchError && (
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/30"></div>
            <div className="relative max-w-2xl mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-3xl flex items-center justify-center border border-slate-700">
                <Search className="h-12 w-12 text-slate-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No Results Found
              </h2>
              <p className="text-slate-400 text-lg mb-3">
                No posts match{" "}
                <span className="text-violet-400 font-semibold">
                  "{debouncedQuery}"
                </span>
              </p>
              <p className="text-slate-500 mb-8">
                Try different keywords or browse all posts
              </p>
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-xl hover:scale-105"
              >
                <X className="h-5 w-5" />
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!hasNoPosts && !hasNoSearchResults && displayData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((post, index) => {
              const tags = getPostTags(post);
              const postDate = getPostDate(post);

              return (
                <div
                  key={post._id || post.id}
                  className="group relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-violet-500/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>

                  <div className="relative p-6">
                    {/* Tag */}
                    {tags && tags.length > 0 && (
                      <div className="mb-4">
                        <span className="inline-flex items-center bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-lg text-xs font-medium">
                          <Zap className="h-3 w-3 mr-1 text-violet-400" />
                          {tags[0]}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="line-clamp-2 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300 mb-4 leading-tight min-h-[3.5rem]">
                      {post.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-slate-400 line-clamp-3 leading-relaxed mb-6 min-h-[4.5rem]">
                      {post.content}
                    </p>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {/* Date Tag */}
                      <span className="inline-flex items-center gap-2 text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(postDate)}
                      </span>

                      {/* Relevance Score Tag */}
                      {debouncedQuery && typeof post.score === "number" && (
                        <span
                          className={`inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r ${getRelevanceColor(post.score)} text-white px-3 py-1.5 rounded-lg shadow-lg`}
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                          {formatRelevanceScore(post.score)} match
                        </span>
                      )}
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={() => openPostModal(post)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-gradient-to-r hover:from-violet-500 hover:to-cyan-500 border border-slate-700 hover:border-transparent text-slate-300 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group/btn shadow-lg hover:shadow-xl"
                    >
                      <BookOpen className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Read Full Post
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for Full Post */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Content */}
            <div
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"></div>

              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-white leading-tight flex-1">
                    {selectedPost.title}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-3 hover:bg-slate-800 rounded-xl transition-colors shrink-0 border border-slate-800 hover:border-slate-700"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6 text-slate-400 hover:text-slate-200" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg">
                    <Calendar className="h-4 w-4" />
                    {formatDate(getPostDate(selectedPost))}
                  </span>

                  {debouncedQuery && typeof selectedPost.score === "number" && (
                    <span
                      className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${getRelevanceColor(selectedPost.score)} text-white px-4 py-2 rounded-lg shadow-lg`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      {formatRelevanceScore(selectedPost.score)} match
                    </span>
                  )}

                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium"
                        >
                          <Zap className="h-3 w-3 mr-1 text-violet-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                    {selectedPost.content}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-6">
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
