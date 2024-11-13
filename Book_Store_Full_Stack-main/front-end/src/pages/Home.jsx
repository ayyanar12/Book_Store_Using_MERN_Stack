import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-x-4">
        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600"
          onClick={() => setShowType("table")}
        >
          Table
        </button>

        <button
          className="px-4 py-1 rounded-lg bg-sky-300 hover:bg-sky-600"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-3xl">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
