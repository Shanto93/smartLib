import LoadingPage from "@/components/ui/LoadingPage";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id ?? "");

  if (isLoading) return <LoadingPage />;

  const book = data?.data;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          {book?.title}
        </h2>
        <p>
          <strong>Description:</strong> {book?.description}
        </p>
        <p>
          <strong>Author:</strong> {book?.author}
        </p>
        <p>
          <strong>Genre:</strong> {book?.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book?.isbn}
        </p>
        <p>
          <strong>Copies:</strong> {book?.copies}
        </p>
        <p>
          <strong>Available:</strong>{" "}
          <span
            className={`font-semibold ${
              book?.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {book?.available ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
