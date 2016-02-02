import request from './request'
export const ADD_JOB = 'ADD_JOB'

export const POST_JOB_REQUEST = 'POST_JOB_REQUEST'
export const POST_JOB_SUCCESS = 'POST_JOB_SUCCESS'
export const POST_JOB_FAILURE = 'POST_JOB_FAILURE'

const jobsUrl = 'http://192.168.1.104:4000/api/jobs'
const tempJob = {}

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


