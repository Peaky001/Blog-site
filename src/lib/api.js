// Real API service using your API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiblog.cloudastra.co';

// Fallback to WordPress REST API if custom API fails
const WORDPRESS_API_URL = 'https://apiblog.cloudastra.co/wp-json/wp/v2';

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Helper function to extract excerpt from content
const extractExcerpt = (content, maxLength = 150) => {
  const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

// Fallback function to fetch from WordPress REST API
async function fetchFromWordPressAPI(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${WORDPRESS_API_URL}${endpoint}${queryString ? '?' + queryString : ''}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }
  });
  
  if (!response.ok) {
    throw new Error(`WordPress API error! status: ${response.status}`);
  }
  
  return response.json();
}

// Get all blog posts with pagination
export async function getBlogPosts(page = 1, limit = 9, search = '', category = '', sort = 'newest') {
  try {
    // First try custom API
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort: sort
    });
    
    if (search) {
      params.append('search', search);
    }
    
    if (category) {
      params.append('category', category);
    }
    
    const response = await fetch(`${API_BASE_URL}/api/blogs?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Custom API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our expected format
    const transformedPosts = data.posts?.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category || 'General',
      timestamp: post.createdAt || post.timestamp || new Date().toISOString(),
      slug: post.slug || createSlug(post.title),
      excerpt: post.excerpt || extractExcerpt(post.content),
      author: post.author || post.authorName || 'Unknown Author',
      readTime: calculateReadingTime(post.content)
    })) || [];
    
    return {
      posts: transformedPosts,
      totalPosts: data.totalPosts || data.total || transformedPosts.length,
      totalPages: data.totalPages || Math.ceil((data.totalPosts || data.total || transformedPosts.length) / limit),
      currentPage: page,
      hasNextPage: data.hasNextPage || (page * limit < (data.totalPosts || data.total || transformedPosts.length)),
      hasPrevPage: page > 1
    };
  } catch (error) {
    console.log('Custom API failed, trying WordPress API...', error.message);
    
    try {
      // Fallback to WordPress REST API
      const wpParams = {
        per_page: limit,
        page: page,
        search: search,
        orderby: sort === 'newest' ? 'date' : 'date',
        order: sort === 'newest' ? 'desc' : 'asc',
        _embed: true
      };
      
      const wpData = await fetchFromWordPressAPI('/posts', wpParams);
      
      // Transform WordPress data to our format
      const transformedPosts = wpData.map(post => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
        timestamp: post.date,
        slug: post.slug,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        author: post._embedded?.author?.[0]?.name || 'Unknown Author',
        readTime: calculateReadingTime(post.content.rendered)
      }));
      
      return {
        posts: transformedPosts,
        totalPosts: parseInt(wpData.headers?.['X-WP-Total'] || transformedPosts.length),
        totalPages: Math.ceil(parseInt(wpData.headers?.['X-WP-Total'] || transformedPosts.length) / limit),
        currentPage: page,
        hasNextPage: page < Math.ceil(parseInt(wpData.headers?.['X-WP-Total'] || transformedPosts.length) / limit),
        hasPrevPage: page > 1
      };
    } catch (wpError) {
      console.error('WordPress API also failed:', wpError);
      // Return empty result on error
      return {
        posts: [],
        totalPosts: 0,
        totalPages: 0,
        currentPage: page,
        hasNextPage: false,
        hasPrevPage: false
      };
    }
  }
}

// Get a single blog post by slug
export async function getBlogPost(slug) {
  try {
    // First try custom API
    const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found');
      }
      throw new Error(`Custom API error! status: ${response.status}`);
    }
    
    const post = await response.json();
    
    // Transform the API response to match our expected format
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category || 'General',
      timestamp: post.createdAt || post.timestamp || new Date().toISOString(),
      slug: post.slug || createSlug(post.title),
      excerpt: post.excerpt || extractExcerpt(post.content),
      author: post.author || post.authorName || 'Unknown Author',
      readTime: calculateReadingTime(post.content)
    };
  } catch (error) {
    console.log('Custom API failed for single post, trying WordPress API...', error.message);
    
    try {
      // Fallback to WordPress REST API
      const wpData = await fetchFromWordPressAPI(`/posts?slug=${slug}&_embed=true`);
      
      if (!wpData || wpData.length === 0) {
        return null;
      }
      
      const post = wpData[0];
      
      // Transform WordPress data to our format
      return {
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
        timestamp: post.date,
        slug: post.slug,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        author: post._embedded?.author?.[0]?.name || 'Unknown Author',
        readTime: calculateReadingTime(post.content.rendered)
      };
    } catch (wpError) {
      console.error('WordPress API also failed for single post:', wpError);
      return null;
    }
  }
}

// Get all unique categories
export async function getCategories() {
  try {
    // First try custom API
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Custom API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.categories || data || [];
  } catch (error) {
    console.log('Custom API failed for categories, trying WordPress API...', error.message);
    
    try {
      // Fallback to WordPress REST API
      const wpData = await fetchFromWordPressAPI('/categories');
      
      return wpData.map(cat => cat.name).sort();
    } catch (wpError) {
      console.error('WordPress API also failed for categories:', wpError);
      // Final fallback: try to get categories from blog posts
      try {
        const blogData = await getBlogPosts(1, 1000); // Get all posts
        const categories = [...new Set(blogData.posts.map(post => post.category))];
        return categories.sort();
      } catch (fallbackError) {
        console.error('Error fetching categories from blog posts:', fallbackError);
        return ['General']; // Default category
      }
    }
  }
}

// Get all blog posts for static generation
export async function getAllBlogPosts() {
  try {
    // First try custom API
    const response = await fetch(`${API_BASE_URL}/api/blogs/slugs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Custom API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.posts || data || [];
  } catch (error) {
    console.log('Custom API failed for slugs, trying WordPress API...', error.message);
    
    try {
      // Fallback to WordPress REST API
      const wpData = await fetchFromWordPressAPI('/posts?per_page=100&fields=id,slug,date');
      
      return wpData.map(post => ({
        slug: post.slug,
        timestamp: post.date
      }));
    } catch (wpError) {
      console.error('WordPress API also failed for slugs:', wpError);
      // Final fallback: get slugs from blog posts
      try {
        const blogData = await getBlogPosts(1, 1000); // Get all posts
        return blogData.posts.map(post => ({
          slug: post.slug,
          timestamp: post.timestamp
        }));
      } catch (fallbackError) {
        console.error('Error fetching blog slugs from blog posts:', fallbackError);
        return [];
      }
    }
  }
}
