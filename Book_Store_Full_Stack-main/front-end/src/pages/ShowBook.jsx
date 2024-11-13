import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useActionData, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4 text-3xl">Show book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col p-4 border-2 border-sky-400 rounded-xl w-fit">
          <div className="my-4">
            <span className="text-xl text-gray-500 ">id :</span>
            <span>{books._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 ">title :</span>
            <span>{books.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 ">Author :</span>
            <span>{books.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 ">PublishYear :</span>
            <span>{books.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 ">Create time :</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 ">updated time :</span>
            <span>{new Date(books.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
