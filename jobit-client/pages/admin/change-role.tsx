import React, { useState, useEffect, useContext, useMemo } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../components/layout/Layout";

import authContext from "../../context/auth/authContext";
import Error404 from "../../components/layout/Error404";
import Alert from "../../components/layout/Alert";

const ChangeRole: React.FC<IUserRole> = () => {
  const [userRole, setUserRole] = useState<IUserRole>({
    email: "",
    role: "",
  });

  const AuthContext = useContext(authContext);
  const { user, users, message, getAllUsers, changeRole } = AuthContext;

  useEffect(() => {
    getAllUsers();
  }, []);

  const onChange = (e: any) => {
    setUserRole({
      ...userRole,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeRole(userRole);
    Router.push("/admin/dashboard");
  };

  const { email, role } = userRole;

  return (
    <Layout>
      <div
        className="bg-cover bg-center h-screen flex justify-center"
        style={{ backgroundImage: `url("../img/pattern.svg")` }}
      >
        <div className="pt-20">
          {!user || user?.role === "client" ? (
            <Error404 message="Forbidden ⚠" />
          ) : (
            <form
              className="bg-gray-800 px-8 py-2 shadow-md rounded flex flex-wrap"
              onSubmit={onSubmit}
            >
              {message && <Alert message={message} />}
              <h2 className="text-2xl text-yellow-200 w-full mb-3 font-bold underline">
                Create new Roles
              </h2>
              <div className="w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  User email
                </label>
                <select
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                >
                  <option value="">-- Select One --</option>
                  {users?.map((user) => (
                    <option value={`${user.email}`}>{user.email}</option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  id="role"
                  name="role"
                  onChange={onChange}
                  value={role}
                >
                  <option value="">-- Select One --</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
                  type="submit"
                >
                  Create new role
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChangeRole;
