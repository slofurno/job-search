import { combineReducers } from 'redux'
import { 
  ADD_JOB, 
  GET_JOBS_SUCCESS, 
  CREATE_NEW_JOB,
  UPDATE_JOB_SUCCESS,
  SELECT_JOB,
  DESELECT_JOB,
  DELETE_JOB_SUCCESS,
  GET_HISTORY_SUCCESS,
  POST_HISTORY_SUCCESS,
  DELETE_HISTORY
} from './actions'

const initialJob = {
  isSelected: false,
  name: "",
  city: "",
  text: "",
  url: "",
  history: [],
  id: -1
}

const initialState = {
  selectedJob: initialJob,
  jobs: []
}

function selectedJob (state = initialJob, action) {
  switch (action.type) {
  case SELECT_JOB:
    return Object.assign({}, action.job, {isSelected:true})
  case DESELECT_JOB:
    return initialJob 
  case CREATE_NEW_JOB:
    return Object.assign({}, initialJob, {isSelected:true})
  default:
    return state
  } 
}



function history (state = [], action) {
  switch (action.type) {
  case GET_HISTORY_SUCCESS:
    return action.history
  case POST_HISTORY_SUCCESS:
    return state.concat([action.history])
  case DELETE_HISTORY:
    return state.filter(x => x.id !== action.id)
  case DELETE_JOB_SUCCESS:
    return state.filter(x => x.job !== action.job.id)
  default:
    return state
  } 

}

function jobs (state = [], action) {
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

  case DELETE_JOB_SUCCESS:
    return state.filter(x => x.id !== action.job.id)

  default:
    return state
  }
}

const rootReducer = combineReducers({
  jobs,
  selectedJob,
  history
})

export default rootReducer
