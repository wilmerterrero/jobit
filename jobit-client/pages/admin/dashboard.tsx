import React, { useState, useEffect, useContext, useMemo } from "react";
import styled from "styled-components";
import Link from "next/link";
import DataTable from "react-data-table-component";
import Layout from "../../components/layout/Layout";

import authContext from "../../context/auth/authContext";
import jobContext from "../../context/job/jobContext";

import DeleteIcon from "../../components/layout/icons/delete";
import EditIcon from "../../components/layout/icons/edit";
import Error404 from "../../components/layout/Error404";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  padding: 3px;
  background-color: #8181c2;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterJob, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterJob}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const Dashboard: React.FC = () => {
  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const JobContext = useContext(jobContext);
  const { jobs, getJobs } = JobContext;

  useEffect(() => {
    getJobs();
  }, []);

  const data = jobs !== null ? jobs : [];

  const [filterJob, setFilterJobs] = useState("");
  const filteredJobs = data.filter(
    (job) =>
      job.position &&
      job.position.toLowerCase().includes(filterJob.toLowerCase())
  );

  const columns = [
    {
      name: "Position",
      selector: "position",
      sortable: true,
    },
    {
      name: "Company",
      selector: "company",
      sortable: true,
    },
    {
      name: "Poster Link",
      button: true,
      cell: (row) => (
        <>
          <a
            href="/"
            target="_blank"
            className="p-2 mr-3 bg-yellow-600 text-white"
            rel="noopener noreferrer"
          >
            <EditIcon />
          </a>
          <a
            href="/"
            target="_blank"
            className="p-2 bg-red-600 text-white"
            rel="noopener noreferrer"
          >
            <DeleteIcon />
          </a>
        </>
      ),
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterJob) {
        setFilterJobs("");
      }
    };

    return (
      <>
        <Link href="/create-job">
          <a className="bg-green-500 px-2 py-1 rounded-sm text-white font-bold mr-10">
            + Create New Job
          </a>
        </Link>
        <FilterComponent
          onFilter={(e) => setFilterJobs(e.target.value)}
          onClear={handleClear}
          filterJob={filterJob}
        />
      </>
    );
  }, [filterJob]);

  return (
    <Layout>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url("../img/pattern.svg")` }}
      >
        <div className="pt-36">
          {!user && user?.role === "client" ? (
            <Error404 message="Forbidden ⚠" />
          ) : (
            <DataTable
              title="Jobs"
              pagination
              columns={columns}
              data={filteredJobs}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
