import React, { useReducer } from 'react';
import jobReducer from './jobReducer';
import jobContext from './jobContext';
import axiosClient from '../../config/axios';

import {
    GET_JOBS_SUCCESS,
    GET_JOBS_ERROR, 
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR, 
    CLEAN_ALERT } from '../../types';

 const JobState: React.FC = ({ children }) => {

    const initialState = {
        message: null,
        job: null,
        jobs: null,
        getJobs: () => {},
        createJob: (job: IJob) => {}
    }

    //reducer for this state
    const [state, dispatch] = useReducer(jobReducer, initialState);

    const getJobs = async () => {
        try {
            const response = await axiosClient.get('/jobs/');
            console.log(response.data.msg);
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: GET_JOBS_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const createJob = async (job: IJob) => {
        try {
            const response = await axiosClient.post('/jobs/publish', {
                position: job.position,
                company: job.company,
                description: job.description,
                category: job.categories,
                type: job.type,
                location: job.location
            });
            dispatch({
                type: CREATE_JOB_SUCCESS,
                payload: response.data.msg
            })
            console.log(job);
        } catch (error) {
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    return ( 
        <jobContext.Provider
            value={{
                message: state.message,
                jobs: state.jobs,
                job: state.job,
                getJobs: getJobs,
                createJob: createJob
            }}
        >
            {children}
        </jobContext.Provider>
     );
}
 
export default JobState;
