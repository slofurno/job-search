import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import Job from './Job'

function printSomething (m, n) {
  console.log(m, n)
}

const jobTarget = {
  canDrop(props) {
    return true
  },
  drop(props, monitor) {
    const item = monitor.getItem()
    props.onJobDrop(item.id)
    //printSomething(item, props)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

//const JobList = ({ jobs, title, onJobSelect, onJobDelete}) => {
class JobList extends Component {

  render () {
    const { 
      jobs, 
      title, 
      onJobSelect,
      onJobDelete,
      connectDropTarget,
      isOver,
      canDrop
    } = this.props

    let sorted = jobs.slice().sort((a,b) => (a.id - b.id))

    let joblist = sorted.map(job => {
      return (
        <Job {...job} 
          key={job.id} 
          onEditClick={onJobSelect}
        />
      )
    })

    let style = {
      width:"270px", 
      margin:"0 5px"
    }

    if (isOver) {
      style.backgroundColor = "red"
    }

    return connectDropTarget(
      <div className="flex column" {...style}>
        <div className="card job-card flex column" 
          style={style}>
          <div className="header flex noshrink">{title}</div>
          <div className="flex column" style={{overflow:"auto"}}>{joblist}</div>
        </div>
      </div>
    )
  }
}

export default DropTarget("JOB", jobTarget, collect)(JobList)
