import React, { useContext } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import authContext from "../context/auth/authContext";
import jobContext from "../context/job/jobContext";
import Error404 from "../components/layout/Error404";
import Alert from "../components/layout/Alert";

const CreateJob: React.FC<IJob> = () => {
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const router = useRouter();

  const { createJob, message } = useContext(jobContext);

  const initialCreateJobValues = {
    position: "",
    company: "",
    description: "",
    category: "",
    location: "",
    type: "",
  };

  const formik = useFormik({
    initialValues: initialCreateJobValues,
    validationSchema: Yup.object({
      position: Yup.string().required("Job position is required"),
      company: Yup.string().required("Job company is required"),
      description: Yup.string().required("Job description is required"),
      category: Yup.string().required("Job categories is required"),
      location: Yup.string().required("Job location is required"),
      type: Yup.string().required("Job type is required"),
    }),
    onSubmit: (values) => {
      if (!user) {
        return router.push("/login");
      }
      createJob(values);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 3000);
    },
  });

  return (
    <Layout>
      {message && <Alert message={message} />}
      <div
        className="bg-cover bg-blue-800 bg-center h-screen flex justify-center items-center space-y-4 my-10"
      >
        {!user ? (
          <Error404 message="Forbidden ⚠" />
        ) : (
          <form
            className="bg-gray-800 px-8 py-2 shadow-md rounded flex flex-wrap md:w-4/5"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl text-yellow-200 w-full mb-3 font-bold underline">
              Post a new Job
            </h2>
            <div className="w-full">
              {formik.touched.category && formik.errors.category ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.category}</p>
                </div>
              ) : null}
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select 
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Select One --</option>
                <option value="design">design</option>
                <option value="programming">programming</option>
                <option value="cloud">cloud</option>
              </select>
            </div>

            <div className="w-full">
              {formik.touched.type && formik.errors.type ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.type}</p>
                </div>
              ) : null}

              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select 
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Select One --</option>
                <option value="Full time">Full time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="w-full">
              {formik.touched.position && formik.errors.position ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.position}</p>
                </div>
              ) : null}
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
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full">
              {formik.touched.company && formik.errors.company ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.company}</p>
                </div>
              ) : null}
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
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full">
              {formik.touched.description && formik.errors.description ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.description}</p>
                </div>
              ) : null}

              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="description"
              >
                Job description
              </label>
              <textarea
                className="shadow appearance-none border border-red rounded w-full py-6 px-3 text-grey-darker mb-3"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {/*
            <div className="w-full">
              {formik.touched.createdAt && formik.errors.createdAt ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.createdAt}</p>
                </div>
              ) : null}

              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="createdAt"
              >
                Created At
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                type="date"
                id="createdAt"
                value={formik.values.createdAt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              */}
            <div className="w-full">
              {formik.touched.location && formik.errors.location ? (
                <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.location}</p>
                </div>
              ) : null}

              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="location"
                type="text"
                placeholder="Job location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
        )}
      </div>
    </Layout>
  );
};

export default CreateJob;
