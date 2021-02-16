import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Layout from '../components/layout/Layout';
import JobsLayout from '../components/layout/jobs/JobsLayout';
import JobCard from '../components/layout/jobs/JobCard';

const Index = () => {

  const jobList: IJob[] = [
    {
        id: 1,
        createdBy: "Wilmer",
        company: "WT. S.R.L",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "Jr. Developer",
        type: "Remote"
    },
    {
        id: 2,
        createdBy: "Roberto",
        company: "X-Tean",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "Backend Developer",
        type: "Remote"
    },
    {
        id: 3,
        createdBy: "Gustaff",
        company: "Gatsby Inc.",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "Frontend Jr Developer",
        type: "Remote"
    },
    {
        id: 4,
        createdBy: "Pedro Fuentes",
        company: "Newtech",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "QA Senior",
        type: "Remote"
    },
    {
        id: 5,
        createdBy: "Wilmer",
        company: "WT. S.R.L",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "Web Developer",
        type: "Remote"
    },
    {
        id: 6,
        createdBy: "Wilmer",
        company: "WT. S.R.L",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus laboriosam quo praesentium optio pariatur perspiciatis odit! Illo quisquam iste earum aliquid.",
        createdAt: "2020-01-10",
        location: "Santo Domingo",
        position: "Senior Backend Developer",
        type: "Remote"
    },
]

  return ( 
    <Layout>
      <Hero />
      <JobsLayout>
        {
          jobList.map((job: IJob) => (
            <JobCard job={job} />
          ))
        }
      </JobsLayout>
    </Layout>
   );
}
 
export default Index;