import React, { Component, PropTypes } from 'react'
import Job from './Job'

export default class JobList extends Component {
  render () {
    const { jobs, onJobSelect, onJobDelete} = this.props

		let sorted = jobs.slice().sort((a,b) => (a.id - b.id))

    let joblist = sorted.map(job => 
        <Job {...job} 
					key={job.id} 
					onEditClick={onJobSelect}
					onDeleteClick = {onJobDelete}
				/>
    )

    return (
        <div>
        {joblist}
        </div>
    )
  }
}
