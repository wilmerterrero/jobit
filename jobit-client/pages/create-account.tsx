import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "../context/auth/authContext";

interface CreateAccountValues {
  Username: string;
  Email: string;
  Password: string;
}

const CreateAccount: React.FC<CreateAccountValues> = () => {

  const { registerUser } = useContext(authContext);

  const initialCreateAccountValuesValues: CreateAccountValues = {
    Username: '',
    Email: '',
    Password: ''
  }

  const formik = useFormik({
    initialValues: initialCreateAccountValuesValues,
    validationSchema: Yup.object({
      Username: Yup.string()
               .required('The username is mandatory'),
      Email: Yup.string()
                .email('The email is not valid')
                .required('The email is mandatory'),
      Password: Yup.string()
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
        className="bg-cover bg-center h-screen flex justify-center items-center space-y-4"
        style={{ backgroundImage: `url("img/pattern.svg")` }}
      >
        <form 
          className="bg-gray-800 my-10 px-8 py-2 md:w-1/2 shadow-md rounded flex flex-wrap"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl text-yellow-200 font-bold mb-4 underline">
            Create an account
          </h2>

          <div className="w-full">

            { formik.touched.Username && formik.errors.Username ? (
                  <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Error</p>
                    <p>{ formik.errors.Username }</p>
                  </div>
                ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="Username"
            >
              Username
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="Username"
              type="text"
              placeholder="Username"
              value={formik.values.Username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          <div className="w-full">

            { formik.touched.Email && formik.errors.Email ? (
                    <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                      <p className="font-bold">Error</p>
                      <p>{ formik.errors.Email }</p>
                    </div>
                  ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="Email"
              type="email"
              placeholder="Email"
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

          </div>

          <div className="mb-6">

            { formik.touched.Password && formik.errors.Password ? (
                    <div className="my-2 p-2 bg-gray-200 border-l-4 border-red-500 text-red-700">
                      <p className="font-bold">Error</p>
                      <p>{ formik.errors.Password }</p>
                    </div>
                  ) : null }

            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="Password"
              type="password"
              placeholder="Password"
              value={formik.values.Password}
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
