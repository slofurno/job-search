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
  postHistory,
  deleteHistory
} from '../actions'

import appSelector from '../selectors'

const titles = [
  "Nothing",
  "Applied",
  "Interview scheduled",
  "Interviewing",
  "Post Interview"
]

const mapDispatchToProps = (dispatch) => {
  return {
    onJobSelect: job => {
      dispatch(selectJob(job))
    },
    onJobDelete: job => {
      let fn = job.id === -1 ? deselectJob : deleteJob 
      dispatch(fn(job))
    },
    onModalSave: job => {
      let fn = job.id === -1 ? postJob : updateJob
      dispatch(fn(job))
    },
    onModalClose: () => {
      dispatch(deselectJob())
    },
    onAddStatus: (job, status) => {
      dispatch(postHistory({job, status}))
    },
    onAddJob: () => {
      dispatch(newJob())
    },
    onDeleteHistory: (history) => dispatch(deleteHistory(history)) 
  }
}

class App extends Component {

  render () {
    const {
      jobs,
      selectedJob,
      history,
      topics,
      onJobSelect,
      onJobDelete,
      onModalSave,
      onModalClose,
      onAddStatus,
      onAddJob,
      onDeleteHistory
    } = this.props

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
              onAddJob()
            }}>
            Add Job
          </a>
        </div>
          <JobCalendar jobs={jobs} history={history}/>
        </div>
        <JobBuckets
          jobs = {jobs} 
          history = {history}
          onJobSelect = {onJobSelect}
          onJobDelete = {onJobDelete}
          topics = {topics}
          addHistory = {onAddStatus}
        />
        <JobModal 
          selectedJob = {selectedJob}
          updateJob = {onModalSave}
          deleteJob = {onJobDelete}
          cancelModal = {onModalClose}
          addStatus = {onAddStatus}
          onDeleteHistory = {onDeleteHistory}
        />
      </div>
    )
  }
}

export default connect(appSelector, mapDispatchToProps)(App)
