import {createSelector} from 'reselect'

const titles = [
  "Nothing",
  "Applied",
  "Interview scheduled",
  "Interviewing",
  "Post Interview"
]

const rawJobsSelector = (state) => state.jobs
const historySelector = (state) => state.history
const rawSelectedJob = (state) => state.selectedJob

const jobsSelector = createSelector(
  rawJobsSelector,
  historySelector,
  (jobs, history) => jobHistory(jobs, history) 
)

const selectedJobSelector = createSelector(
  rawSelectedJob,
  jobsSelector,
  (selectedJob, jobs) => {
    let selectedjobmatch = jobs.filter(job => job.id === selectedJob.id)[0]
    return selectedjobmatch || selectedJob
  }
)

const appSelector = createSelector(
  jobsSelector,
  historySelector,
  selectedJobSelector,
  (jobs, history, selectedJob) => {
    return {jobs, history, selectedJob}
  }
)

function jobHistory (jobs, history) {
  return jobs.map(job => {
    let myhistory = history.filter(x => x.job === job.id)
    myhistory.sort((a,b) => a.time - b.time)
    let idx = Math.min(myhistory.length, titles.length - 1)
    let lastStatus = titles[idx]
    return Object.assign({}, job, {lastStatus}, {history: myhistory})
  })
}

export default appSelector
