import express, { Application, type Request, type Response } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();
export default app;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5173/"] }));
app.use(cors());
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management website!");
});
