# 🚀 CloudAstra Blog Site

A modern, interactive blog platform built with Next.js 14+ featuring dynamic content-based images, real-time search, and responsive design. This project replicates the professional blog experience of CloudAstra with enhanced UI/UX.

![Blog Site Preview](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

## ✨ Features

### 🎨 **Modern Design**
- **Professional UI/UX** matching CloudAstra's aesthetic
- **Responsive design** optimized for all devices
- **Interactive animations** and micro-interactions
- **Glass-morphism effects** and modern gradients
- **Smooth transitions** throughout the application

### 🖼️ **Dynamic Content Images**
- **Content-based image generation** for each blog post
- **Interactive hover effects** with animations
- **Category-specific visual patterns** (Technology, AI, Cloud, etc.)
- **SVG pattern overlays** generated dynamically
- **Loading skeletons** for better UX

### 🔍 **Advanced Search & Filtering**
- **Real-time search** across titles, content, and authors
- **Category filtering** with dropdown selection
- **Sort options** (Newest/Oldest)
- **Debounced search** for optimal performance
- **Visual feedback** for active filters

### 📱 **Blog Management**
- **Pagination** with "View More" functionality
- **9 posts per page** with infinite scroll capability
- **Dynamic routing** for individual blog posts
- **SEO optimization** with meta tags
- **ISR (Incremental Static Regeneration)** for performance

### 🔌 **API Integration**
- **Real API integration** with CloudAstra API
- **WordPress REST API fallback** for compatibility
- **Error handling** with graceful fallbacks
- **Environment variable configuration**
- **ISR caching** for optimal performance

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.3 with App Router
- **Language:** JavaScript (ES6+)
- **Styling:** TailwindCSS 4.0
- **Icons:** Heroicons (SVG)
- **API:** RESTful API with WordPress fallback
- **Deployment:** Vercel-ready

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or later
- **npm** 9.0 or later
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-site-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NEXTAUTH_URL=https://cloudastra.co
   NEXTAUTH_URL=https://cloudastra.co
   NEXTAUTH_SECRET="RandomStringToTestGoogleAuth"
   GOOGLE_ID="your-google-client-id"
   GOOGLE_SECRET="your-google-client-secret"
   NEXT_PUBLIC_API_URL=https://apiblog.cloudastra.co
   NEXT_PUBLIC_LAMBDA_URL=https://your-lambda-url
   NEXT_PUBLIC_SESSION_REWIND=your-session-rewind-key
   NEXT_PUBLIC_JOB_LAMBDA=https://your-job-lambda-url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Blog-site-1/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── blog/              # Blog pages
│   │   │   ├── [slug]/        # Dynamic blog post pages
│   │   │   └── page.js        # Blog listing page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   ├── components/            # React components
│   │   ├── BlogCard.js        # Blog post card component
│   │   ├── BlogImage.js       # Interactive image component
│   │   ├── BlogList.js        # Blog listing component
│   │   ├── Filters.js         # Search and filter component
│   │   ├── SearchBar.js       # Search input component
│   │   ├── FilterDropdown.js  # Dropdown filter component
│   │   └── BlogImageSkeleton.js # Loading skeleton
│   └── lib/                   # Utility functions
│       ├── api.js             # API integration
│       └── imageGenerator.js  # Dynamic image generation
├── public/                    # Static assets
├── .env.local                # Environment variables
├── package.json              # Dependencies
├── tailwind.config.js        # TailwindCSS configuration
└── README.md                 # This file
```

## 🎨 Customization

### **Color Scheme**
The design uses a modern gradient palette:
- **Primary:** Blue (#3B82F6) to Purple (#8B5CF6)
- **Secondary:** Various category-specific gradients
- **Background:** Slate to Indigo gradients

### **Content-Based Images**
Images are automatically generated based on:
- **Blog category** (Technology, AI, Cloud, etc.)
- **Content keywords** (Next.js, React, JavaScript, etc.)
- **Visual patterns** (Circuit, Code, Geometric, etc.)

### **API Configuration**
Update the API endpoints in `src/lib/api.js`:
```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiblog.cloudastra.co';
const WORDPRESS_API_URL = 'https://apiblog.cloudastra.co/wp-json/wp/v2';
```

## 📱 Responsive Design

- **Mobile-first** approach with TailwindCSS
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interfaces for mobile devices
- **Optimized layouts** for all screen sizes

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**
The project is compatible with:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🔌 API Endpoints

### **Expected API Structure**
```javascript
// Get blog posts
GET /api/blogs?page=1&limit=9&search=query&category=tech&sort=newest

// Get single blog post
GET /api/blogs/[slug]

// Get categories
GET /api/categories

// Get blog slugs (for static generation)
GET /api/blogs/slugs
```

### **WordPress Fallback**
If custom API fails, the system automatically falls back to WordPress REST API:
```javascript
// WordPress endpoints
GET /wp-json/wp/v2/posts
GET /wp-json/wp/v2/posts?slug=[slug]
GET /wp-json/wp/v2/categories
```

## 🎯 Features in Detail

### **Interactive Images**
- **Dynamic generation** based on content analysis
- **Hover effects** with scale, rotation, and brightness
- **Floating particles** and animated elements
- **Category-specific patterns** and color schemes
- **Loading states** with skeleton animations

### **Search & Filtering**
- **Real-time search** with 300ms debounce
- **Multi-field search** (title, content, author)
- **Category filtering** with dropdown
- **Sort options** (newest/oldest)
- **Visual feedback** for active filters

### **Performance**
- **ISR (Incremental Static Regeneration)** for optimal performance
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Caching strategies** for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CloudAstra** for design inspiration
- **Next.js** team for the amazing framework
- **TailwindCSS** for the utility-first CSS framework
- **Vercel** for deployment platform

## 📞 Support

If you have any questions or need help with setup:

1. **Check the documentation** above
2. **Open an issue** on GitHub
3. **Contact the development team**

---

**Built with ❤️ using Next.js, React, and TailwindCSS**