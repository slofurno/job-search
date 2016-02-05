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
    console.log("selected:", myselectedjob)


    return (
      <div style={{height:"100%", position:"relative"}}>
        <div style={{
          width: "100%", 
          backgroundColor: "RGBA(0,0,0,.1)",
          padding: "4px 10px"
        }}>
          <a href="#" onClick={ (e) => {
            e.preventDefault()
            dispatch(newJob()) }}>
            Add Job
          </a>
          <JobCalendar jobs={jobs} history={history}/>
        </div>
        <JobBuckets
          jobs = {jobs} 
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
