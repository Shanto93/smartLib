import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingPage from "@/components/ui/LoadingPage";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useState } from "react";

const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: allBooks, isLoading } = useGetAllBooksQuery(
    { page: currentPage, limit },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleEdit = (bookId: string) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDelete = async (bookId: string, title: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirm) {
      const res = await deleteBook(bookId);
      if (res.data?.success === true) {
        toast.success(`${title} Deleted Successfully`);
        setCurrentPage(1);
      } else {
        toast.error("Error deleting book");
      }
    }
  };

  const handleBorrow = (bookId: string | undefined) => {
    navigate(`/borrow/${bookId}`);
  };

  const handleView = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-800">
        All Books
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <Table className="w-full text-sm text-left text-gray-700">
          <TableCaption className="text-gray-500 mt-2 italic">
            A list of all books in the system.
          </TableCaption>

          <TableHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <TableRow>
              <TableHead className="text-center text-white">SL No</TableHead>
              <TableHead className="text-center text-white">Title</TableHead>
              <TableHead className="text-center text-white">
                Description
              </TableHead>
              <TableHead className="text-center text-white">Author</TableHead>
              <TableHead className="text-center text-white">Genre</TableHead>
              <TableHead className="text-center text-white">ISBN</TableHead>
              <TableHead className="text-center text-white">Copies</TableHead>
              <TableHead className="text-center text-white">
                Available
              </TableHead>
              <TableHead className="text-center text-white">View</TableHead>
              <TableHead className="text-center text-white">Borrow</TableHead>
              <TableHead className="text-center text-white">Edit</TableHead>
              <TableHead className="text-center text-white">Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allBooks?.data?.map((book: IBook, index: number) => (
              <TableRow
                key={book._id}
                className={`hover:bg-indigo-50 transition duration-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <TableCell className="text-center font-semibold">
                  {(currentPage - 1) * limit + index + 1}
                </TableCell>
                <TableCell className="text-center font-semibold text-indigo-700">
                  {book.title}
                </TableCell>
                <TableCell className="text-center">
                  {book.description}
                </TableCell>
                <TableCell className="text-center">{book.author}</TableCell>
                <TableCell className="text-center">{book.genre}</TableCell>
                <TableCell className="text-center">{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      book.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => book._id && handleView(book._id)}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 inline" />
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleBorrow(book._id)}
                    disabled={!book.available}
                    className={`px-4 py-1 rounded-full font-semibold text-sm shadow-md transition duration-300 ${
                      book.available
                        ? "bg-gradient-to-r from-green-400 to-green-600 text-white hover:shadow-green-500/50 hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Borrow
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => book._id && handleEdit(book._id)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 inline" />
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() =>
                      book._id && handleDelete(book._id, book.title)
                    }
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {allBooks?.meta &&
        typeof allBooks.meta.totalPages === "number" &&
        allBooks.meta.totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center font-semibold">
              Page {currentPage} of {allBooks.meta.totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < (allBooks.meta?.totalPages ?? 1) ? prev + 1 : prev
                )
              }
              disabled={currentPage === allBooks.meta.totalPages}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
};

export default AllBooks;
