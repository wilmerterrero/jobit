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
  CLEAN_ALERT,
} from "../../types";

const jobReducer = (state: any, action: any) => {
  switch (action.type) {
    case EDIT_JOB_ERROR:
    case DELETE_JOB_ERROR:
    case GET_JOBS_ERROR:
    case CREATE_JOB_ERROR:
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
      };
    case GET_JOB_EDIT:
      return {
        ...state,
        editedJob: action.payload,
      };
    case EDIT_JOB_SUCCESS:
      console.log(state);
      return {
        ...state,
        jobs: state.jobs.map((job: IJob) =>
          job.id === state.editedJob ? (job = action.payload) : job
        ),
        message: action.payload,
        editedJob: null,
      };
    case GET_JOB_DELETE:
      return {
        ...state,
        deletedJob: action.payload,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.filter((job: IJob) => job.id !== state.deletedJob),
        deletedJob: null,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default jobReducer;
