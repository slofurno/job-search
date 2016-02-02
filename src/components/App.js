import React, { Component, PropTypes } from 'react'
import JobList from './JobList'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    const { dispatch, jobs } = this.props

    return (
      <div>
        <JobList jobs={jobs}/>
      </div>
    )
  }
}

function select (state) {
  return state;
}

export default connect(select)(App)
