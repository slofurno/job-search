import request from './request'
export const ADD_JOB = 'ADD_JOB'
export const CREATE_NEW_JOB = 'CREATE_NEW_JOB'
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS'

export const POST_JOB_REQUEST = 'POST_JOB_REQUEST'
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS'
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE'

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST' 
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS'

export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS'

export const SELECT_JOB = 'SELECT_JOB'
export const DESELECT_JOB = 'DESELECT_JOB'

export const ADD_HISTORY = 'ADD_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const POST_HISTORY_SUCCESS = 'POST_HISTORY_SUCCESS'

const tempJob = {}

function getJobsSuccess (jobs) {
  return {
    type: GET_JOBS_SUCCESS,
    jobs
  }
}

const _newJob = {
  name: "",
  city: "",
  status: 0,
  post : ""
}

export function deselectJob () {
  return {
    type: DESELECT_JOB
  }
}

export function newJob () {
  return {
    type: SELECT_JOB,
    job: _newJob
  }
}

function addJob (job) {
  return {
    type: ADD_JOB,
    job
  }
}

function postJobFailure (job) {
  return function (dispatch) {
    console.log("post job failure")
  } 
}

function postJobSuccess (job) {
   
}

function updateJobSuccess (job) {
  return {
    type: UPDATE_JOB_SUCCESS,
    job
  }
}

function getHistorySuccess (history) {
  return {
    type: GET_HISTORY_SUCCESS,
    history
  }
}

function postHistorySuccess (history) {
  return {
    type: POST_HISTORY_SUCCESS,
    history
  }
}

export function selectJob (job) {
  return {
    type: SELECT_JOB,
    job
  }
}

function parse (n) {
  return JSON.parse(n)
}

function logError (err) {
  return console.error(err)
}

export function getHistory () {
  return function (dispatch) {
    return request ({
      url: "/api/history",
      method: "GET" 
    })
    .then(parse)
    .then(history => dispatch(getHistorySuccess(history)))
    .catch(logError)
  }
}

export function postHistory (history) {
  return function (dispatch) {
    return request ({
      url: "/api/history",
      method: "POST",
      body: JSON.stringify(history),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(parse)
    .then(history => dispatch(postHistorySuccess(history)))
    .catch(logError)
  }
}

export function getJobs () {
  return function (dispatch) {
    return request ({
      url: "/api/jobs",
      method: "GET"
    })
    .then(parse)
    .then(jobs => dispatch(getJobsSuccess(jobs)))
    .catch(logError)
  }
}

export function updateJob (job) {
  return function (dispatch) {
    dispatch(deselectJob())

    return request ({
      url: `/api/jobs/${job.id}`,
      method: "PUT",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => dispatch(updateJobSuccess(job)))
    .catch(logError)
  }
}

function deleteJobSuccess (job) {
  return {
    type: DELETE_JOB_SUCCESS,
    job
  }
}

export function deleteJob (job) {
  return function(dispatch) {
    return request({
      url: `/api/jobs/${job.id}`,
      method: "DELETE"
    })
    .then(() => dispatch(deleteJobSuccess(job)))
    .then(() => dispatch(deselectJob()))
    .catch(logError)
  }
}

export function postJob (job) {
  return function (dispatch) {
    dispatch(deselectJob())

    return request ({
      url: "/api/jobs",
      method: "POST",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(parse)
    .then((res) => dispatch(addJob(res)))
      .catch(err => {
        console.log(err);
        dispatch(postJobFailure(job))
      })
  }
}


