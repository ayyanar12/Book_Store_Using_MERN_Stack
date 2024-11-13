import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModel = ({ item, onClose }) => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute text-3xl text-red-600 cursor-pointer right-6 top-6"
          onClick={onClose}
        />
        <h2 className="px-4 py-1 bg-red-300 rounded-lg w-fit">
          {item.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{item._id}</h4>
        <div className="flex items-center justify-start gap-x-2">
          <PiBookOpenTextLight className="text-2xl text-red-300" />
          <h2 className="my-1">{item.title}</h2>
        </div>
        <div className="flex items-center justify-start gap-x-2">
          <BiUserCircle className="text-2xl text-red-300" />
          <h2 className="my-1">{item.author}</h2>
        </div>
        <p className="mt-4">Anything you want?</p>
        <p className="my-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit,
          sapiente. Molestiae, aut magnam dicta aspernatur ipsa autem animi sed
          suscipit harum similique nisi numquam rerum hic saepe expedita
          blanditiis voluptatem!
        </p>
      </div>
    </div>
  );
};

export default BookModel;
