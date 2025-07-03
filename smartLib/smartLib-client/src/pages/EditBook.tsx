import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateBookMutation,
  useGetSingleBookQuery,
} from "@/redux/api/baseApi";
import LoadingPage from "@/components/ui/LoadingPage";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
] as const;

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  genre: z.enum(genreOptions),
  isbn: z.string().min(1, "ISBN is required"),
  copies: z.coerce.number().min(0, "Copies must be 0 or more"),
});

type FormValues = z.infer<typeof formSchema>;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleBookQuery(id ?? "");
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      copies: 1,
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data.data.title,
        description: data.data.description || "",
        author: data.data.author,
        genre: data.data.genre,
        isbn: data.data.isbn,
        copies: data.data.copies,
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await updateBook({
        id: id ?? "",
        updatedDoc: values,
      }).unwrap();
      if (res.success) {
        toast.success(`${values.title} update successfully!`);
        navigate("/books");
      } else {
        toast.error(`Failed to update ${values.title}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while updating book");
    }
  };

  if (isLoading) return <LoadingPage></LoadingPage>;

  return (
    <div className="max-w-xl mb-10 mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Edit Book
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2 bg-white text-gray-700"
                  >
                    {genreOptions.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBook;
