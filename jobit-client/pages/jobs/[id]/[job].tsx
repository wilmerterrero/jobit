import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";

import authContext from "../../../context/auth/authContext";
import jobContext from "../../../context/job/jobContext";
import Error404 from "../../../components/layout/Error404";
import Alert from "../../../components/layout/Alert";
import axiosClient from "../../../config/axios";

const EditJob: React.FC<IJob> = () => {
  const [job, setJob] = useState<IJob | null>({
    position: "",
    company: "",
    description: "",
    categories: "",
    location: "",
    type: "",
  });

  const AuthContext = useContext(authContext);
  const { user, authUser } = AuthContext;

  const { editJob, message } = useContext(jobContext);
  //checking if the user is authenticated
  useEffect(() => {
    authUser();
  }, []);

  //getting id from routing
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id) {
      const getJob = async () => {
        try {
          const job = await axiosClient.get(`/jobs/one/${id}`);
          if (job.status === 200) {
            setJob(job.data.msg);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getJob();
    }
  }, [id]);

  const onChange = (e: any) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editJob(job);
    router.push("/admin/dashboard")
  };

  const { position, description, location, company, categories, type } = job;

  return (
    <Layout>
      {message && <Alert message={message} />}
      <div className="bg-cover bg-blue-800 bg-center h-screen flex justify-center items-center space-y-4 my-10">
        {!user ? (
          <Error404 message="Forbidden ⚠" />
        ) : (
          <form
            className="bg-gray-800 px-8 py-2 shadow-md rounded flex flex-wrap md:w-4/5"
            onSubmit={onSubmit}
          >
            <h2 className="text-2xl text-yellow-200 w-full mb-3 font-bold underline">
              Edit Job - {position}
            </h2>
            <div className="w-full">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="categories"
                name="categories"
                value={categories}
                onChange={onChange}
              >
                <option value="">-- Select One --</option>
                <option value="design">Design</option>
                <option value="programming">Programming</option>
                <option value="cloud">Cloud</option>
              </select>
            </div>

            <div className="w-full">

              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="type"
                name="type"
                value={type}
                onChange={onChange}
              >
                <option value="">-- Select One --</option>
                <option value="Full time">Full time</option>
                <option value="Part Time">Part Time</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

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
                name="position"
                placeholder="Job position"
                value={position}
                onChange={onChange}
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
                name="company"
                placeholder="Company"
                value={company}
                onChange={onChange}
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
                name="description"
                value={description}
                onChange={onChange}
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
                name="location"
                placeholder="Job location"
                value={location}
                onChange={onChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
                type="submit"
              >
                Edit job
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditJob;
