'use client';

import { useState, useEffect } from 'react';
import { generateBlogImage, generateSVGPattern } from '@/lib/imageGenerator';

export default function BlogImage({ post, className = '', isDetail = false }) {
  const [imageConfig, setImageConfig] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const config = generateBlogImage(post);
    setImageConfig(config);
    // Simulate loading time for smooth transition
    setTimeout(() => setIsLoaded(true), 100);
  }, [post]);

  if (!imageConfig) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse rounded-2xl`}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const { gradient, icon, pattern, primaryColor, secondaryColor, category } = imageConfig;
  const height = isDetail ? 'h-64' : 'h-48';

  return (
    <div 
      className={`${className} ${height} relative overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-500 ${
        isHovered ? 'scale-110 brightness-110' : 'scale-100'
      }`}>
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg 
            width="100%" 
            height="100%" 
            className="transition-all duration-500"
            style={{ 
              transform: isHovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
              filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
            }}
            dangerouslySetInnerHTML={{ __html: generateSVGPattern(imageConfig) }}
          />
        </div>
        
        {/* Animated Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? 'opacity-10' : 'opacity-20'
        }`} />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Icons */}
          <div className={`absolute top-4 right-4 text-4xl transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}>
            {icon}
          </div>
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 transition-all duration-300 ${
            isHovered ? 'scale-105 translate-y-0' : 'scale-100 translate-y-0'
          }`}>
            <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              {category}
            </span>
          </div>
          
          {/* Reading Time Badge */}
          <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
            isHovered ? 'scale-105 translate-y-0' : 'scale-100 translate-y-0'
          }`}>
            <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
              {post.readTime}
            </span>
          </div>
          
          {/* Interactive Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-200 group/play">
              <svg className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          {/* Content Type Indicator */}
          <div className={`absolute top-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-xs font-medium">Interactive</span>
            </div>
          </div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-white/30 rounded-full transition-all duration-1000 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 200}ms`,
                  animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Content Overlay for Detail Page */}
        {isDetail && (
          <div className="absolute inset-0 flex items-end p-6">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
                {post.title}
              </h1>
              <p className="text-white/90 text-lg drop-shadow-md">
                {post.excerpt}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-white/20 transition-all duration-300 ${
        isHovered ? 'border-white/40 shadow-2xl' : 'border-transparent'
      }`} />
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-2xl">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// Add CSS animations
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}
