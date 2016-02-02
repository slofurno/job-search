import React, { Component, PropTypes } from 'react'
import JobList from './JobList'
import JobModal from './JobModal'
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
    const { dispatch, jobs, selectedJob } = this.props

		let fn = selectedJob.id >= 0 ? updateJob : postJob

    return (
      <div>
				<a href="#" onClick={ (e) => {
					e.preventDefault()
					dispatch(newJob()) }}>
					Add Job
				</a>

        <JobModal 
          selectedJob = {selectedJob} 
          updateJob = {job => dispatch(fn(job))}
					cancelModal = {() => dispatch(deselectJob())}
        />
        <JobList
          jobs = {jobs} 
          onJobSelect={job => dispatch(selectJob(job))}
          onJobDelete ={job => dispatch(deleteJob(job))}
        />
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(App)
