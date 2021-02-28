import { 
    CREATE_JOB_ERROR,
    CREATE_JOB_SUCCESS, 
    GET_JOBS_ERROR, 
    GET_JOBS_SUCCESS} from '../../types';

const jobReducer = (state: any, action: any) => {
    switch(action.type) {
        case GET_JOBS_ERROR:
        case CREATE_JOB_ERROR:
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.payload
            }
        default:
            return state;
    }
}

export default jobReducer;