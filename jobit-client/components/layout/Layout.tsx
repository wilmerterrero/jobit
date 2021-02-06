import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>jobit</title>
      </Head>
      <div className="bg-gray-100">
        <Navbar />
        <main>
            {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
