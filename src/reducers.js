import { combineReducers } from 'redux'
import { 
  ADD_JOB, 
  GET_JOBS_SUCCESS, 
  UPDATE_JOB_SUCCESS,
  SELECT_JOB,
  DESELECT_JOB
} from './actions'


const initialState = {
  selectedJob,
  jobs: []
}

function selectedJob (state = null, action) {

  switch (action.type) {
  case SELECT_JOB:
    return action.job

  case DESELECT_JOB:
    return null 

  default:
    return state
  } 
}

function jobs (state = [], action) {
  console.log(action.type);
  switch (action.type) {
  case ADD_JOB:
    return [
      ...state, action.job
    ]
  case UPDATE_JOB_SUCCESS:
    let job = action.job
    let others = state.filter(x => x.id !== job.id)
    others.push(job)
    return others
    
  case GET_JOBS_SUCCESS:
    return action.jobs

  default:
    return state
  }
}

const rootReducer = combineReducers({
  jobs,
  selectedJob
})

export default rootReducer
