import React, { useContext, useEffect } from "react";
import Hero from "../components/layout/Hero";
import Layout from "../components/layout/Layout";
import JobsLayout from "../components/layout/jobs/JobsLayout";

import authContext from "../context/auth/authContext";
import axiosClient from "../config/axios";
import Error404 from "../components/layout/Error404";

const Index = (props) => {
  //auth context
  const AuthContext = useContext(authContext);
  const { authUser } = AuthContext;

  //checking if the user is authenticated
  useEffect(() => {
    authUser();
  }, []);

  return (
    <Layout>
      <Hero />
      {
        (
          !props.jobs ? <Error404 message="Loading" /> : (
            <JobsLayout jobs={props.jobs} />
          )
        )
      }
    </Layout>
  );
};

Index.getInitialProps = async ({ query }) => {
  const jobs = await axiosClient.get("/jobs/");
  return {
    jobs: jobs.data.msg,
  };
};

export default Index;
