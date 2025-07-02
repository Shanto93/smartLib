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
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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

const AddBook = () => {
  const navigate = useNavigate();
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

  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await createBook(data).unwrap();
      console.log(res.success === true);
      if (res.success === true) {
        toast.success("Book added successfully!");
        form.reset();
        navigate("/books");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to add book. " + error.message);
      } else {
        toast.error("Failed to add book.");
      }
    }
  };

  return (
    <div className="max-w-xl mb-10 mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Add New Book
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre Dropdown */}
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

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Copies */}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddBook;
