import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
