import React, { useReducer } from 'react';
import jobReducer from './jobReducer';
import jobContext from './jobContext';

 const JobState: React.FC = ({ children }) => {

    const initialState = {
        job: null,
        jobs: null,
        createJob: (job: IJob) => {}
    }

    //reducer for this state
    const [state, dispatch] = useReducer(jobReducer, initialState);

    const createJob = () => {

    }

    return ( 
        <jobContext.Provider
            value={{
                jobs: state.jobs,
                job: state.job,
                createJob: createJob
            }}
        >
            {children}
        </jobContext.Provider>
     );
}
 
export default JobState;
