import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";

interface CreateAccountValues {
  username: string;
  email: string;
  password: string;
  role: Roles;
}

const CreateAccount: React.FC<CreateAccountValues> = () => {

  const { registerUser } = useContext(authContext);

  const initialCreateAccountValuesValues: CreateAccountValues = {
    username: '',
    email: '',
    password: '',
    role: 'client'
  }

  const formik = useFormik({
    initialValues: initialCreateAccountValuesValues,
    validationSchema: Yup.object({
      username: Yup.string()
               .required('The username is mandatory'),
      email: Yup.string()
                .email('The email is not valid')
                .required('The email is mandatory'),
      password: Yup.string()
                .required('The password is mandatory')
                .min(8, 'The password must contain 6 characters')
    }),
    onSubmit: values => {
      registerUser(values);
    }
  });

  return (
    <Layout>
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center"
        style={{ backgroundImage: `url("img/pattern.svg")` }}
      >
        <form 
          className="bg-gray-800 md:w-1/2 shadow-md rounded px-8 pt-6 pb-8 flex flex-col"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl text-yellow-200 font-bold mb-4 underline">
            Create an account
          </h2>

          <div className="mb-4">

            { formik.touched.username && formik.errors.username ? (
                  <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Error</p>
                    <p>{ formik.errors.username }</p>
                  </div>
                ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          <div className="mb-4">

            { formik.touched.email && formik.errors.email ? (
                    <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                      <p className="font-bold">Error</p>
                      <p>{ formik.errors.email }</p>
                    </div>
                  ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          <div className="mb-6">

            { formik.touched.password && formik.errors.password ? (
                    <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                      <p className="font-bold">Error</p>
                      <p>{ formik.errors.password }</p>
                    </div>
                  ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          <div className="block md:flex items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
              type="submit"
            >
              Create Account
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
};

export default CreateAccount;
