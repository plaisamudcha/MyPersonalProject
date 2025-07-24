import { useEffect } from "react";

function PageButton({ page, setPage, totalPage }) {
  useEffect(() => {
    if (totalPage > 0 && page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);
  return (
    <div className="join mx-auto flex items-center">
      <button
        disabled={page === 1}
        className="join-item btn btn-lg"
        onClick={() => setPage((prv) => (prv - 1 < 1 ? 1 : prv - 1))}
      >
        «
      </button>
      <button className="join-item btn btn-lg">Page {page}</button>
      <button
        disabled={page === totalPage}
        className="join-item btn btn-lg"
        onClick={() =>
          setPage((prv) => (prv + 1 > totalPage ? totalPage : prv + 1))
        }
      >
        »
      </button>
      <p className="text-lg font-bold ms-4">Total page is {totalPage}</p>
    </div>
  );
}

export default PageButton;
