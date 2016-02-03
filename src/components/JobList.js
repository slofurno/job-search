import React, { Component, PropTypes } from 'react'
import Job from './Job'

export default class JobList extends Component {
  render () {
    const { jobs, history, onJobSelect, onJobDelete} = this.props

		let sorted = jobs.slice().sort((a,b) => (a.id - b.id))

    let joblist = sorted.map(job => {
      let jobHistory = history.filter(x => x.job === job.id)
      console.log(jobHistory)
      return (
        <Job {...job} 
          key={job.id} 
          history={jobHistory}
          onEditClick={onJobSelect}
          onDeleteClick = {onJobDelete}
        />
      )
    })

    return (
      <div>
      {joblist}
      </div>
    )
  }
}
