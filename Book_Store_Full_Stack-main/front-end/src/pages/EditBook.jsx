import React from "react";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error has occuerd please check console");
        console.log(err);
      });
  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited SuccessFully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        // alert("An error has occuerd please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl y-4">Edit book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-500 rounded-xl w-[600px] p-4 mx-auto">
        <div className="m-4">
          <label className="mr-4 text-xl text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-500 rounded-md"
          />
        </div>
        <div className="m-4">
          <label className="mr-4 text-xl text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-500 rounded-md"
          />
        </div>
        <div className="m-4">
          <label className="mr-4 text-xl text-gray-500">PublishYear</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-500 rounded-md"
          />
        </div>
        <button
          className="p-2 m-8 rounded-md bg-sky-300"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
