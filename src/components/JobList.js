import React, { Component, PropTypes } from 'react'
import Job from './Job'

export default class JobList extends Component {
  render () {
    const { jobs, title, onJobSelect, onJobDelete} = this.props

		let sorted = jobs.slice().sort((a,b) => (a.id - b.id))

    let joblist = sorted.map(job => {
      return (
        <Job {...job} 
          key={job.id} 
          onEditClick={onJobSelect}
          onDeleteClick = {onJobDelete}
        />
      )
    })

    return (
      <div className="card job-card" style={{width:"300px", margin:"0 14px 20px 0"}}>
      <h3>{title}</h3>
      {joblist}
      </div>
    )
  }
}
