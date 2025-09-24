import React, { useState, useEffect } from 'react';
import Item from './Item';

const Pagination = ({ items = [], itemsPerPage = 12 , setSortType}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  // Calculate total pages and update current items when items change
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(items.length / itemsPerPage);
    setTotalPages(calculatedTotalPages);
    
    // Get current items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedItems = items.slice(indexOfFirstItem, indexOfLastItem);
    
    setCurrentItems(paginatedItems);
  }, [items, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust if we're at the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  if (items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div className=" w-96 md:w-full">
      <div className='flex justify-between items-center mx-6 mb-4'>
        <div className="text-sm text-gray-700">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, items.length)} of {items.length} items
        <span> (Page {currentPage} of {totalPages})</span>
      </div>
              <select onChange={(e)=>setSortType(e.target.value)} name="sortby" className='border-gray-300 border rounded p-2 outline-none' > sort By
              <option value="Relavent">sort by: Relavent</option>
              <option value="Low-High">sort by: Low to High</option>
              <option value="High-Low">sort by: High to Low</option>
              </select>
            </div>
      {/* Display current items */}
      <div className="grid grid-cols-2 gap-y-2 md:grid md:grid-cols-4 items-center justify-between">
        {currentItems.map((product, index) => (
            <div key={index}>
                      <Item product={product}/>

            </div>
        ))}
      </div>
      

      
      <div className="flex text-sm justify-center gap-2 mt-8 flex-wrap">

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          ‹ Prev
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 border border-gray-300 rounded ${
              currentPage === pageNumber
                ? "bg-[red] text-white border-[red] shadow-black shadow"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Next ›
        </button>

      </div>

      
    </div>
  );
};

export default Pagination;