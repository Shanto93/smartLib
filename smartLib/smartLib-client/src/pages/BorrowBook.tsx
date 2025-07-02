import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import LoadingPage from "@/components/ui/LoadingPage";
import type { IError } from "@/types";

const formSchema = z.object({
  quantity: z.coerce.number().min(1, "Quantity is required"),
  dueDate: z.string().min(1, "Due Date is required"),
});

type FormValues = z.infer<typeof formSchema>;

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleBookQuery(bookId ?? "", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [createBorrow, { isLoading: isSubmitting }] = useCreateBorrowMutation();

  const book = data?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const res = await createBorrow({
        book: bookId,
        quantity: formData.quantity,
        dueDate: new Date(formData.dueDate).toISOString(),
      }).unwrap();
      toast.success(res?.message);
      form.reset();
      navigate("/borrow-summary");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const err = error as IError;
      toast.error(err?.data?.message);
    }
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  if (!book)
    return <p className="text-center mt-10 text-red-500">Book not found.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Borrow Book: {book.title}
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            {...form.register("quantity")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            {...form.register("dueDate")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
