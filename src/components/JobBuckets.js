import React, { Component, PropTypes } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import JobList from './JobList'

class JobBuckets extends Component {
  render () {
    const { jobs, history, topics, addHistory, onJobSelect, onJobDelete } = this.props 

    let jobBuckets = topics.map((x, i) =>
      <JobList
        key= {i}
        jobs= {x.jobs}
        title= {x.topic}
        onJobSelect= {onJobSelect}
        onJobDelete= {onJobDelete}
        onJobDrop= {job => addHistory(job, x.topic)}
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
