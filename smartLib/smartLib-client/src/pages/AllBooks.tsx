// // import { useGetAllBooksQuery } from "@/redux/api/baseApi";
// // import type { IBook } from "@/types";
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import LoadingPage from "@/components/ui/LoadingPage";

// // const AllBooks = () => {
// //   const { data: allBooks, isLoading } = useGetAllBooksQuery(undefined);

// //   if (isLoading) {
// //     return <LoadingPage></LoadingPage>
// //   }

// //   return (
// //     <div>
// //       <h2>All Books</h2>
// //       <div>
// //         <Table>
// //           <TableCaption>A list of all books.</TableCaption>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead className="w-[100px]">Title</TableHead>
// //               <TableHead>Description</TableHead>
// //               <TableHead>Author</TableHead>
// //               <TableHead className="text-right">Genre</TableHead>
// //               <TableHead className="text-right">ISBN</TableHead>
// //               <TableHead className="text-right">Copies</TableHead>
// //               <TableHead className="text-right">Available</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {allBooks?.data?.map((book: IBook) => (
// //               <TableRow key={book._id}>
// //                 <TableCell className="font-medium">{book.title}</TableCell>
// //                 <TableCell className="font-medium">
// //                   {book.description}
// //                 </TableCell>
// //                 <TableCell>{book.author}</TableCell>
// //                 <TableCell>{book.genre}</TableCell>
// //                 <TableCell className="text-right">{book.isbn}</TableCell>
// //                 <TableCell className="text-right">{book.copies}</TableCell>
// //                 <TableCell className="text-right">{book.available}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllBooks;

// import { useGetAllBooksQuery } from "@/redux/api/baseApi";
// import type { IBook } from "@/types";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import LoadingPage from "@/components/ui/LoadingPage";

// const AllBooks = () => {
//   const { data: allBooks, isLoading } = useGetAllBooksQuery(undefined);

//   if (isLoading) {
//     return <LoadingPage />;
//   }

//   return (
//     <div className="p-4 md:p-10 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-center mb-8 text-indigo-800">📚 All Books</h2>

//       <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
//         <Table className="w-full text-sm text-left text-gray-700">
//           <TableCaption className="text-gray-500 mt-2 italic">A list of all books in the system.</TableCaption>
//           <TableHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//             <TableRow>
//               <TableHead className="px-4 py-3 text-white text-center">SL No</TableHead>
//               <TableHead className="px-4 py-3 text-white text-center">Title</TableHead>
//               <TableHead className="px-4 py-3 text-white text-center">Description</TableHead>
//               <TableHead className="px-4 py-3 text-white text-center">Author</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">Genre</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">ISBN</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">Copies</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">Available</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">Edit</TableHead>
//               <TableHead className="px-4 py-3 text-center text-white">Delete</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {allBooks?.data?.map((book: IBook, index: number) => (
//               <TableRow
//                 key={book._id}
//                 className={`hover:bg-indigo-50 transition duration-300 ${
//                   index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 }`}
//               >
//                 <TableCell className="px-4 py-2 font-semibold">{index+1}</TableCell>
//                 <TableCell className="px-4 py-2 font-semibold text-indigo-700">{book.title}</TableCell>
//                 <TableCell className="px-4 py-2">{book.description}</TableCell>
//                 <TableCell className="px-4 py-2">{book.author}</TableCell>
//                 <TableCell className="px-4 py-2 text-right">{book.genre}</TableCell>
//                 <TableCell className="px-4 py-2 text-right">{book.isbn}</TableCell>
//                 <TableCell className="px-4 py-2 text-right">{book.copies}</TableCell>
//                 <TableCell className="px-4 py-2 text-right">
//                   <span
//                     className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
//                       book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {book.available ? "Yes" : "No"}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AllBooks;

import { useGetAllBooksQuery } from "@/redux/api/baseApi";
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
import { Pencil, Trash2 } from "lucide-react";

const AllBooks = () => {
  const { data: allBooks, isLoading } = useGetAllBooksQuery(undefined);

  const handleEdit = (bookId: string) => {
    console.log("Edit book:", bookId);
    // Navigate to edit page or open modal
    // Example: router.push(`/dashboard/edit-book/${bookId}`)
  };

  const handleDelete = (bookId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirm) {
      console.log("Delete book:", bookId);
      // Call mutation (e.g. useDeleteBookMutation)
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-800">
        📚 All Books
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <Table className="w-full text-sm text-left text-gray-700">
          <TableCaption className="text-gray-500 mt-2 italic">
            A list of all books in the system.
          </TableCaption>
          <TableHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <TableRow>
              <TableHead className="text-center">SL No</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Author</TableHead>
              <TableHead className="text-center">Genre</TableHead>
              <TableHead className="text-center">ISBN</TableHead>
              <TableHead className="text-center">Copies</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
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
                  {index + 1}
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

                {/* Edit Button */}
                <TableCell className="text-center">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 inline" />
                  </button>
                </TableCell>

                {/* Delete Button */}
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDelete(book._id)}
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
    </div>
  );
};

export default AllBooks;
