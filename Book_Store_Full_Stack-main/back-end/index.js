import express from "express";
import { PORT, mongodbURL } from "./config.js";
import { book } from "./models/booModel.js";
import mongoose, { Mongoose } from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());
//allow all resouses
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
//allow the authorized peoples only

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome to the book store");
});

app.use("/books", bookRoute);
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App successfully connected to the database");
    app.listen(PORT, () => {
      console.log(`App is Listening to port :${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
