import React, { useState, useEffect, useContext, useMemo } from "react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import Layout from "../../components/layout/Layout";

import authContext from "../../context/auth/authContext";
import jobContext from "../../context/job/jobContext";

import DeleteIcon from "../../components/layout/icons/delete";
import EditIcon from "../../components/layout/icons/edit";
import Error404 from "../../components/layout/Error404";
import axiosClient from "../../config/axios";

const Dashboard: React.FC = () => {

  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [filterJob, setFilterJobs] = useState("");

  const AuthContext = useContext(authContext);
  const { user } = AuthContext;

  const JobContext = useContext(jobContext);
  const { jobs, getJobs, deleteJob } = JobContext;

  useEffect(() => {
    getJobs();
  }, []);

  const data = jobs !== null ? jobs : [];

  const filteredJobs = data.filter(
    (job) =>
      job.position &&
      job.position.toLowerCase().includes(filterJob.toLowerCase())
  );

  const fetchJobs = async page => {
    setLoading(true);

    const response = await axiosClient.get(
      `/jobs/pages/${page}/${perPage}`,
    );

    setJobData(response.data.info);
    setTotalRows(response.data.totalCount);
    setLoading(false);
  };

  const handlePageChange = page => {
    fetchJobs(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axiosClient.get(
      `/jobs/pages/${page}/${perPage}`,
    );

    setJobData(response.data.info);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(0);
  
  }, []);

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
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Poster Link",
      button: true,
      cell: (row) => (
        <>
          <Link href="/jobs/[id]/[job]" as={`/jobs/${row.id}/edit-job`}>
            <a
              target="_blank"
              className="p-2 mr-3 bg-yellow-600 text-white"
              rel="noopener noreferrer"
            >
              <EditIcon />
            </a>
          </Link>
          <button
            type="button"
            onClick={() => deleteJob(row.id)}
            className="p-2 bg-red-600 text-white"
          >
            <DeleteIcon />
          </button>
        </>
      ),
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <>
        <Link href="/create-job">
          <a className="bg-green-500 px-2 py-1 rounded-sm text-white font-bold mr-5">
            + Create New Job
          </a>
        </Link>
        <Link href="/admin/change-role">
          <a className="bg-blue-500 px-2 py-1 rounded-sm text-white font-bold">
            Manage users
          </a>
        </Link>
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
          {!user || user?.role === "client" ? (
            <Error404 message="Forbidden ⚠" />
          ) : (
            <DataTable
              title="Jobs"
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              progressPending={loading}
              columns={columns}
              data={jobData}
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
