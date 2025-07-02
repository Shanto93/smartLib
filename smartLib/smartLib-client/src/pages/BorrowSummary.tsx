import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import LoadingPage from "@/components/ui/LoadingPage";
import type { IError } from "@/types";

const BorrowSummary = () => {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <LoadingPage />;
  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        {(error as IError)?.data?.message || "Failed to fetch borrow summary."}
      </div>
    );

  const borrowData = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Borrow Summary
      </h1>

      {borrowData.length === 0 ? (
        <p className="text-center text-gray-500">No borrowed books yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Total Quantity Borrowed
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm">{item.book.title}</td>
                  <td className="px-6 py-4 text-sm">{item.book.isbn}</td>
                  <td className="px-6 py-4 text-sm">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
