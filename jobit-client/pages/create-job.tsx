import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";

const CreateJob: React.FC<IJob> = () => {
  const CreateJobValues = {
    position: "",
    company: "",
    description: "",
    createdAt: "",
    location: "",
    type: "",
  };

  return (
    <Layout>
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center space-y-4"
        style={{ backgroundImage: `url("img/pattern.svg")` }}
      >
        <form className="bg-gray-800 my-10 px-8 py-2 shadow-md rounded flex flex-wrap">
          <h2 className="text-2xl text-yellow-200 w-full mb-3 font-bold underline">
            Post a new Job
          </h2>
          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="position"
              type="text"
              placeholder="Job position"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="company"
              type="text"
              placeholder="Company"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="description"
            >
              Job description
            </label>
            <textarea
              className="shadow appearance-none border border-red rounded w-full py-6 px-3 text-grey-darker mb-3"
              id="description"
            ></textarea>
          </div>

          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="createdat"
            >
              Created At
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              type="date"
              id="createdat"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 "
              id="location"
              type="text"
              placeholder="Job location"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="type"
              type="text"
              placeholder="Type of job"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
              type="submit"
            >
              Create job
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateJob;
