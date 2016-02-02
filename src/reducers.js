import { ADD_JOB } from './actions'
import { combineReducers } from 'redux'

const initialState = {
  jobs: []
}

function jobs (state = [], action) {
  console.log(action.type);
  switch (action.type) {
  case ADD_JOB:
    return [
      ...state, action.job
    ]

  default:
    return state
  }
}

const rootReducer = combineReducers({
  jobs 
})

export default rootReducer
