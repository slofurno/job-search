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
	deleteJob
} from '../actions'

class App extends Component {

  render () {
    const { dispatch, jobs, selectedJob, history } = this.props

    let myjobs = jobs.map(job => {
      let myhistory = history.filter(x => x.job === job.id)
      console.log(myhistory)
      myhistory.sort((a,b) => a.time - b.time)
      return Object.assign({}, job, {history: myhistory})
    })

		let fn = selectedJob.id >= 0 ? updateJob : postJob

    let selectedjobmatch = myjobs.filter(job => job.id === selectedJob.id)[0]
    let myselectedjob = selectedjobmatch || selectedJob

    return (
      <div className="flex column stretch" style={{height:"100%", position:"relative"}}>
        <div 
          className="flex noshrink" 
          style={{
            height: "32px",
            width: "100%", 
            backgroundColor: "RGBA(0,0,0,.15)",
            padding: "2px 4px"
          }}
        >
          <a href="#" 
            className="flex noshrink"
            style={{padding:"6px", backgroundColor:"RGBA(0,0,0,.15)"}} 
            onClick={ (e) => {
            e.preventDefault()
            dispatch(newJob()) }}>
            Add Job
          </a>
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
					cancelModal = {() => dispatch(deselectJob())}
        />
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(App)
