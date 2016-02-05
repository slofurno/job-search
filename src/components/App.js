import React, { Component, PropTypes } from 'react'
import JobList from './JobList'
import JobModal from './JobModal'
import JobCalendar from './JobCalendar'
import JobBuckets from './JobBuckets'
import { connect } from 'react-redux'
import { 
	postJob, 
	newJob, 
	selectJob, 
	deselectJob, 
	updateJob,
	deleteJob,
  postHistory
} from '../actions'

const titles = [
  "Nothing",
  "Applied",
  "Interview scheduled",
  "Interviewing",
  "Post Interview"
]

class App extends Component {

  render () {
    const { dispatch, jobs, selectedJob, history } = this.props

    let myjobs = jobs.map(job => {
      let myhistory = history.filter(x => x.job === job.id)
      myhistory.sort((a,b) => a.time - b.time)
      let lastStatus = titles[myhistory.length]
      return Object.assign({}, job, {lastStatus}, {history: myhistory})
    })

		let fn = selectedJob.id >= 0 ? updateJob : postJob

    let selectedjobmatch = myjobs.filter(job => job.id === selectedJob.id)[0]
    let myselectedjob = selectedjobmatch || selectedJob

    return (
      <div className="flex column stretch" style={{height:"100%", position:"relative"}}>
        <div 
          className="flex noshrink center" 
          style={{
            width: "100%", 
            backgroundColor: "RGBA(0,0,0,.15)",
            padding: "5px"
          }}
        >
        <div className="flex noshrink align-items-center">
          <a href="#" 
            className="link inverted"
            onClick={ (e) => {
            e.preventDefault()
            dispatch(newJob()) }}>
            Add Job
          </a>
        </div>
          <JobCalendar jobs={jobs} history={history}/>
        </div>
        <JobBuckets
          jobs = {myjobs} 
          history = {history}
          onJobSelect={job => dispatch(selectJob(job))}
          onJobDelete ={job => dispatch(deleteJob(job))}
        />
        <JobModal 
          selectedJob = {myselectedjob} 
          updateJob = {job => dispatch(fn(job))}
          deleteJob ={job => dispatch(deleteJob(job))}
					cancelModal = {() => dispatch(deselectJob())}
          addStatus = {h => dispatch(postHistory(h))}
        />
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(App)
