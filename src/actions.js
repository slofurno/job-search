import request from './request'
export const ADD_JOB = 'ADD_JOB'
export const CREATE_NEW_JOB = 'CREATE_NEW_JOB'

export const POST_JOB_REQUEST = 'POST_JOB_REQUEST'
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS'
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE'

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST' 
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS'

export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS'

export const SELECT_JOB = 'SELECT_JOB'
export const DESELECT_JOB = 'DESELECT_JOB'

export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS'

const jobsUrl = 'http://192.168.1.104:4000/api/jobs'
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

export function selectJob (job) {
  return {
    type: SELECT_JOB,
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
		dispatch(deselectJob())

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

export function deleteJob (job) {
	return function(dispatch) {
		dispatch({
			type: DELETE_JOB_SUCCESS,
			job
		})

		return request({
      url: `${jobsUrl}/${job.id}`,
			method: "DELETE"
		})

	}
}

export function postJob (job) {
  return function (dispatch) {
		dispatch(deselectJob())

    return request ({
      url: jobsUrl,
      method: "POST",
      body: JSON.stringify({job}),
      headers: {
        "Content-Type": "application/json"
      }
    })
		.then(parseResponse)
		.then((res) => dispatch(addJob(res)))
      .catch(err => {
        console.log(err);
        dispatch(postJobFailure(job))
      })
  }

}


