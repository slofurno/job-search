import {createSelector} from 'reselect'

const titles = [
  "Nothing",
  "Applied",
  "Interview scheduled",
  "Interviewing",
  "Post Interview"
]

const topics = [
  "find",
  "apply",
  "interview",
  "wait"
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

const topicSelector = createSelector(
  jobsSelector,
  (jobs) => {
    let bytopic = jobs.reduce((a,c) => {
      a[c.topic] = a[c.topic] ? a[c.topic].concat([c]) : [c]
      return a
    }, {})

    return titles.map(x => {
      return {
        topic: x,
        jobs: bytopic[x] || []
      }
    })
  }
)

const appSelector = createSelector(
  jobsSelector,
  historySelector,
  selectedJobSelector,
  topicSelector,
  (jobs, history, selectedJob, topics) => {
    return {jobs, history, selectedJob, topics}
  }
)

function jobHistory (jobs, histories) {
    return jobs.map(job => {
    let history = histories.filter(x => x.job === job.id)
    history.sort((a,b) => a.time - b.time)
    let recent = history.slice(-1)[0]
    let topic = recent ? recent.status : titles[0]


    //let idx = Math.min(myhistory.length, titles.length - 1)
    //let lastStatus = titles[idx]
    return Object.assign({}, job, {topic, history})
  })
}

export default appSelector
