import { combineReducers } from 'redux'
import { 
  ADD_JOB, 
  GET_JOBS_SUCCESS, 
  UPDATE_JOB_SUCCESS,
  SELECT_JOB,
  DESELECT_JOB,
	DELETE_JOB_SUCCESS,
  GET_HISTORY_SUCCESS
} from './actions'

let emptyJob = {
  isSelected: false,
  name: "",
  city: "",
  post: "",
  status: 0,
  id: -1
}

const initialState = {
  selectedJob:emptyJob,
  jobs: []
}

function selectedJob (state = emptyJob, action) {

  switch (action.type) {
  case SELECT_JOB:
    let job = Object.assign({},{isSelected:true},action.job)
    return job

  case DESELECT_JOB:
    return emptyJob 

  default:
    return state
  } 
}



function history (state = [], action) {
  switch (action.type) {
  case GET_HISTORY_SUCCESS:
    return action.history

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
    let deletedJob = action.job
    let notDeleted = state.filter(x => x.id !== deletedJob.id)
		return notDeleted 

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
