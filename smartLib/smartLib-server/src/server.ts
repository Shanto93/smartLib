import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import "dotenv/config";
const port = process.env.PORT || 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(`${process.env.URL}`);
    console.log("Connected to MongoDB");
    const server = app.listen(port, () => {
      console.log(`Library Management app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
