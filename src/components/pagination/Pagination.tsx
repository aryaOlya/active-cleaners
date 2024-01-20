import React from "react";
import MuiPagination from "@mui/material/Pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (event:any,newPage:number) => {
    onPageChange(newPage);
  };
  return (
    <>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
      />
    </>
  );
};

export default Pagination;
