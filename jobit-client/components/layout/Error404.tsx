import React from "react";

const Error404 = ({ message }) => {
  return (
    <h1 className="text-center text-3xl font-bold text-white mt-5 bg-blue-400 rounded-2xl px-5 py-5">
      {message}
    </h1>
  );
};

export default Error404;
