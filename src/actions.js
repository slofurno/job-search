import request from './request'
export const ADD_JOB = 'ADD_JOB'

export const POST_JOB_REQUEST = 'POST_JOB_REQUEST'
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS'
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE'

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST' 
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS'


export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS'

const jobsUrl = 'http://192.168.1.104:4000/api/jobs'
const tempJob = {}

function getJobsSuccess (jobs) {
  return {
    type: GET_JOBS_SUCCESS,
    jobs
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

function parseResponse (n) {
  let response = JSON.parse(n)
  return response.data
}

function logError (err) {
  return console.error(err)
}

export function getJobs () {
  return function (dispatch) {
    return request ({
      url: jobsUrl,
      method: "GET"
    })
    .then(parseResponse)
    .then(jobs => dispatch(getJobsSuccess(jobs)))
    .catch(logError)
  }
}

export function updateJob (job) {
  return function (dispatch) {
    return request ({
      url: `${jobsUrl}/${job.id}`,
      method: "PUT",
      body: JSON.stringify({job}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => dispatch(updateJobSuccess(job)))
    .catch(logError)
  }
}

export function postJob (job) {
  return function (dispatch) {
    dispatch(addJob(job)) 
    //
    return request ({
      url: jobsUrl,
      method: "POST",
      body: JSON.stringify({job}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        dispatch(postJobFailure(job))
      })
  }

}


