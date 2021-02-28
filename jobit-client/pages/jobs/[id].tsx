import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/Error404";

import axiosClient from "../../config/axios";
import authContext from "../../context/auth/authContext";

const Job: React.FC = () => {
  const [job, setJob] = useState<IJob | null>({
    position: "",
    company: "",
    description: "",
    categories: "",
    createdBy: "",
    createdAt: "",
    location: "",
    type: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [applyMessage, setApplyMessage] = useState<boolean>(false);

  //auth context
  const AuthContext = useContext(authContext);
  const { user, authUser } = AuthContext;

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
          setError(true);
          console.log(error);
        }
      };
      getJob();
    }
  }, [id]);

  const showApplyMessage = () => {
    if (!applyMessage) {
      setApplyMessage(true);
    } else {
      setApplyMessage(false);
    }
  };

  const { position, description, location, createdBy, company } = job;

  return (
    <Layout>
      {error ? (
        <Error404 message="The Job doesn't exist!" />
      ) : (
        <div className="bg-cover bg-center h-screen bg-black flex justify-center items-center">
          <div className="md:flex justify-around py-12 w-4/5 bg-gray-500 rounded-xl">
            <div className="flex flex-col divide-y divide-y divide-white">
              <header className="py-3">
                <h1 className="text-3xl pb-3 text-white no-underline hover:underline font-bold">
                  {position}
                </h1>
                <p className="text-lg text-gray-200 font-bold">{location}</p>
              </header>
              <div className="py-5">
                <p className="text-lg text-white font-bold">{company}</p>
              </div>
              <div className="pt-5">
                <p className="text-lg text-white">{description}</p>
              </div>
            </div>
            <aside>
              <img
                alt="Placeholder"
                className="block h-auto w-72"
                src="https://picsum.photos/600/400/?random"
              />
              {user ? (
                <>
                  <div className="flex justify-center py-6">
                    <button
                      className="bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full"
                      onClick={showApplyMessage}
                    >
                      Apply
                    </button>
                  </div>
                  <p
                    className={` ${
                      applyMessage ? null : "hidden"
                    } text-lg text-white font-bold block`}
                  >
                    Send your resume to {createdBy}
                  </p>
                </>
              ) : null}
            </aside>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Job;
