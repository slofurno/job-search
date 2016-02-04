import React, { Component, PropTypes } from 'react'
import JobList from './JobList'

const titles = [
  "nothing",
  "applied",
  "interview scheduled",
  "interviewed",
  "offered"
]

export default class JobBuckets extends Component {
  render () {
    const { jobs, history, onJobSelect, onJobDelete } = this.props 

    let buckets = [[], [], [], [], []]

    let joblist = jobs.forEach(job => {
      let jobHistory = history.filter(x => x.job === job.id)
     
      let historyCount = Math.min(buckets.length-1, jobHistory.length) 
      buckets[historyCount].push(job)
    })

    let jobBuckets = buckets.map((jobs, i) => <JobList key={i} jobs={jobs} title={titles[i]} onJobSelect={onJobSelect} onJobDelete={onJobDelete}/>)

    return (
      <div>{jobBuckets}</div>
    )
  }

}
