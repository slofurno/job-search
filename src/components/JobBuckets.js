import React, { Component, PropTypes } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import JobList from './JobList'

const titles = [
  "Nothing",
  "Applied",
  "Interview scheduled",
  "Interviewing",
  "Post Interview"
]

class JobBuckets extends Component {
  render () {
    const { jobs, history, onJobSelect, onJobDelete } = this.props 

    let buckets = [[], [], [], [], []]

    jobs.forEach(job => {
      let jobHistory = job.history
      let historyCount = Math.min(buckets.length-1, jobHistory.length) 
      buckets[historyCount].push(job)
    })

    let jobBuckets = buckets.map((jobs, i) => 
      <JobList 
        key={i} 
        jobs={jobs} 
        title={titles[i]} 
        onJobSelect={onJobSelect} 
        onJobDelete={onJobDelete}
      />
    )

    return (
      <div 
        className="flex grow"
        style={{
          width:"100%", 
          padding:"5px 0", 
          marginBottom:"20px",
          whiteSpace:"nowrap",
          overflowX:"auto"
      }}>
        {jobBuckets}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(JobBuckets)
