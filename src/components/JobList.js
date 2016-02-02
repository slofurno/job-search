import React, { Component, PropTypes } from 'react'
import Job from './Job'

export default class JobList extends Component {
  render () {
    const { jobs } = this.props

    let joblist = jobs.map(job => 
        <Job {...job} key={job.id}/>
    )

    return (
        <div>
        {joblist}
        </div>
    )
  }
}
