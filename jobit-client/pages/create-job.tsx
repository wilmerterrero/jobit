import React, { useContext } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import authContext from "../context/auth/authContext";
import jobContext from "../context/job/jobContext";
import JobAlert from "../components/layout/jobs/JobAlert";
import Error404 from "../components/layout/Error404";

const CreateJob: React.FC<IJob> = () => {
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const router = useRouter();

  const { createJob, message } = useContext(jobContext);

  const initialCreateJobValues = {
    Position: "",
    Company: "",
    Description: "",
    CreatedAt: "",
    Location: "",
    Type: "",
  };

  const formik = useFormik({
    initialValues: initialCreateJobValues,
    validationSchema: Yup.object({
      Position: Yup.string().required("Job position is required"),
      Company: Yup.string().required("Job company is required"),
      Description: Yup.string().required("Job description is required"),
      CreatedAt: Yup.date().required("Job date is required"),
      Location: Yup.string().required("Job location is required"),
      Type: Yup.string().required("Job type is required"),
    }),
    onSubmit: (values) => {
      if (!user) {
        return router.push("/login");
      }
      createJob(values);
    },
  });

  return (
    <Layout>
      {message && <JobAlert />}
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center space-y-4"
        style={{ backgroundImage: `url("img/pattern.svg")` }}
      >
        {!user ? (
          <Error404 message="Forbidden ⚠" />
        ) : (
          <form
            className="bg-gray-800 my-10 px-8 py-2 shadow-md rounded flex flex-wrap"
            onSubmit={formik.handleSubmit}
          >
            <h2 className="text-2xl text-yellow-200 w-full mb-3 font-bold underline">
              Post a new Job
            </h2>
            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="Position"
              >
                Position
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="Position"
                type="text"
                placeholder="Job position"
                value={formik.values.Position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="Company"
              >
                Company
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="Company"
                type="text"
                placeholder="Company"
                value={formik.values.Company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="Description"
              >
                Job description
              </label>
              <textarea
                className="shadow appearance-none border border-red rounded w-full py-6 px-3 text-grey-darker mb-3"
                id="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>

            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="Createdat"
              >
                Created At
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                type="date"
                id="CreatedAt"
                value={formik.values.CreatedAt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="Location"
              >
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="Location"
                type="text"
                placeholder="Job location"
                value={formik.values.Location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                id="Type"
                type="text"
                placeholder="Type of job"
                value={formik.values.Type}
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
