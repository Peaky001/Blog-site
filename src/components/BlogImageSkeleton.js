export default function BlogImageSkeleton({ className = '' }) {
  return (
    <div className={`${className} bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden`}>
      {/* Gradient background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
      
      {/* Pattern skeleton */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
      
      {/* Badge skeletons */}
      <div className="absolute top-4 left-4">
        <div className="w-20 h-6 bg-white/50 rounded-full"></div>
      </div>
      <div className="absolute bottom-4 right-4">
        <div className="w-16 h-6 bg-white/50 rounded-full"></div>
      </div>
      
      {/* Center icon skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/30 rounded-full"></div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  );
}

// Add shimmer animation
const style = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}
