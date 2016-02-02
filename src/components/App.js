import React, { Component, PropTypes } from 'react'
import JobList from './JobList'
import JobModal from './JobModal'
import { connect } from 'react-redux'
import { addJob, selectJob } from '../actions'

class App extends Component {
  render () {
    const { dispatch, jobs, selectedJob } = this.props

    return (
      <div>
        <JobModal selectedJob={selectedJob}/>
        <JobList jobs={jobs} onJobSelect={job => dispatch(selectJob(job))}/>
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(App)
