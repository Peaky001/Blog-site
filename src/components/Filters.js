import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

export default function Filters({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  categories = [],
  totalPosts = 0 
}) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search by title, content, or author..."
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <FilterDropdown
            label="Category"
            value={selectedCategory}
            onChange={onCategoryChange}
            options={categories}
            placeholder="All Categories"
            className="min-w-[180px]"
          />
          
          <FilterDropdown
            label="Sort By"
            value={sortBy}
            onChange={onSortChange}
            options={sortOptions.map(option => option.label)}
            placeholder="Sort by"
            className="min-w-[180px]"
          />
        </div>
      </div>
      
      {totalPosts > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-semibold">{totalPosts}</span> blog post{totalPosts !== 1 ? 's' : ''}
              {searchTerm && (
                <span className="ml-2">
                  matching <span className="text-blue-600 font-semibold">"{searchTerm}"</span>
                </span>
              )}
              {selectedCategory && (
                <span className="ml-2">
                  in <span className="text-blue-600 font-semibold">"{selectedCategory}"</span>
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              <span>Filtered results</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
