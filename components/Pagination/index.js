import React, { useState } from "react";

const Pagination = ({ totalCount, pageSize, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(totalCount / pageSize);

  const changePage = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const createPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="pagination flex justify-center">
      <button
        className="btn hover:!bg-black"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1} 
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
            fill="#969696"
          />
        </svg>
      </button>
      {createPageNumbers().map((number) => (
        <button
          key={number}
          className={`btn hover:!bg-black ${
            number === currentPage ? "hover:text-white" : "hover:text-gray-500"
          }`}
          onClick={() => changePage(number)} 
        >
          {number}
        </button>
      ))}
      <button
        className="btn hover:!bg-black"
        onClick={() => changePage(currentPage + 1)} 
        disabled={currentPage === pageCount}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z"
            fill="#969696"
            
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
