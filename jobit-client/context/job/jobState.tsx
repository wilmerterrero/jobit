import React, { useReducer } from 'react';
import jobReducer from './jobReducer';
import jobContext from './jobContext';
import axiosClient from '../../config/axios';

import {
    GET_JOBS_SUCCESS,
    GET_JOBS_ERROR, 
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR, 
    GET_JOB_DELETE,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_ERROR,
    GET_JOB_EDIT,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    CLEAN_ALERT } from '../../types';

 const JobState: React.FC = ({ children }) => {

    const initialState = {
        message: null,
        job: null,
        jobs: null,
        deletedJob: null,
        getJobs: () => {},
        createJob: (job: IJob) => {},
        deleteJob: (id: number) => {},
        editJob: (id: number) => {},
    }

    //reducer for this state
    const [state, dispatch] = useReducer(jobReducer, initialState);

    const getJobs = async () => {
        try {
            const response = await axiosClient.get('/jobs/');
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
                category: job.category,
                type: job.type,
                location: job.location
            });
            dispatch({
                type: CREATE_JOB_SUCCESS,
                payload: response.data.message
            })
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

    const getJobOnEdit = (id: number) => {
        dispatch({
            type: GET_JOB_EDIT,
            payload: id
        })
    }

    const editJob = async (job: IJob) => {
        getJobOnEdit(job.id);
        getJobs();
        try {
            const response = await axiosClient.put(`/jobs/update/${job.id}`, {
                position: job.position,
                company: job.company,
                description: job.description,
                category: job.categories,
                type: job.type,
                location: job.location
            });
            console.log(response.data.msg);
            dispatch({
                type: EDIT_JOB_SUCCESS,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT
            })
        }, 3000);
    }

    const getJobOnDelete = (id: number) => {
        dispatch({
            type: GET_JOB_DELETE,
            payload: id
        })
    }

    const deleteJob = async (id: number) => {

        getJobOnDelete(id);

        try {
            const response = await axiosClient.delete(`/jobs/delete/one/${id}`);
            dispatch({
                type: DELETE_JOB_SUCCESS,
                payload: response.data.msg
            })
        } catch (error) {
            dispatch({
                type: DELETE_JOB_ERROR,
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
                deletedJob: state.deletedJob,
                getJobs: getJobs,
                createJob: createJob,
                editJob: editJob,
                deleteJob: deleteJob
            }}
        >
            {children}
        </jobContext.Provider>
     );
}
 
export default JobState;
