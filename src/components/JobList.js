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
      <div className="flex column">
        <div className="card job-card flex column" 
          style={{
            width:"270px", 
            margin:"0 5px"
          }}>
          <div className="header flex noshrink">{title}</div>
          <div className="flex column" style={{overflow:"auto"}}>{joblist}</div>
        </div>
      </div>
    )
  }
}
