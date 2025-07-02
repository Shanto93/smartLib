import { useEffect, useState } from "react";
import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import LoadingPage from "@/components/ui/LoadingPage";
import type { IError } from "@/types";

const BorrowSummary = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery({
    page,
    limit,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) return <LoadingPage />;

  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        {(error as IError)?.data?.message || "Failed to fetch borrow summary."}
      </div>
    );

  const borrowData = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Borrow Summary
      </h1>

      {borrowData.length === 0 ? (
        <p className="text-center text-gray-500">No borrowed books yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Total Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {borrowData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm">{item.book.title}</td>
                    <td className="px-6 py-4 text-sm">{item.book.isbn}</td>
                    <td className="px-6 py-4 text-sm">{item.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {meta && totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  aria-current={page === idx + 1 ? "page" : undefined}
                  className={`px-3 py-1 rounded ${
                    page === idx + 1
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BorrowSummary;
