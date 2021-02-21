import { 
    CREATE_JOB_SUCCESS } from '../../types';

const jobReducer = (state: any, action: any) => {
    switch(action.type) {
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default jobReducer;