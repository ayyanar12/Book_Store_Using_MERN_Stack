import express from "express";
import { book } from "../models/booModel.js";

const router = express.Router();
//route for get all books
router.get("/", async (req, res) => {
  try {
    const books = await book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
//route for get single book
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const books = await book.findById(id);
    return res.status(200).json(books);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
//route for update book
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title,author,publishYear",
      });
    }

    const { id } = req.params;
    const result = await book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title,author,publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const Book = await book.create(newBook);
    return res.status(201).send(Book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
