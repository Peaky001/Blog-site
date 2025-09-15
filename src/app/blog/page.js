'use client';

import { useState, useEffect, useCallback } from 'react';
import { getBlogPosts, getCategories } from '@/lib/api';
import BlogList from '@/components/BlogList';
import Filters from '@/components/Filters';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Load blog posts
  const loadPosts = useCallback(async (page = 1, reset = false) => {
    setIsLoading(true);
    try {
      const sortValue = sortBy === 'Newest First' ? 'newest' : 'oldest';
      const result = await getBlogPosts(page, 9, debouncedSearchTerm, selectedCategory, sortValue);
      
      if (reset) {
        setPosts(result.posts);
        setCurrentPage(1);
      } else {
        setPosts(prevPosts => [...prevPosts, ...result.posts]);
        setCurrentPage(page);
      }
      
      setTotalPosts(result.totalPosts);
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  // Load posts when filters change
  useEffect(() => {
    loadPosts(1, true);
  }, [loadPosts]);

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle category change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    const sortValue = value === 'Newest First' ? 'newest' : 'oldest';
    setSortBy(sortValue);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) {
      loadPosts(currentPage + 1, false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Latest Tech Insights
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover cutting-edge insights, expert tutorials, and industry best practices 
            from our team of technology experts. Stay ahead with the latest trends in 
            cloud computing, AI, and modern development.
          </p>
        </div>

        {/* Filters */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          categories={categories}
          totalPosts={totalPosts}
        />

        {/* Blog List */}
        <BlogList posts={posts} isLoading={isLoading} />

        {/* Load More Button */}
        {hasNextPage && !isLoading && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'View More Posts'
              )}
            </button>
          </div>
        )}

        {/* No more posts message */}
        {!hasNextPage && posts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">You've reached the end of the blog posts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
