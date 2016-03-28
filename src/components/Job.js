import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

const jobSource = {
  beginDrag(props) {
    return {id: props.id}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Job extends Component { 
  render () {
    const {
      onEditClick, 
      id, 
      name, 
      city, 
      post, 
      status,
      connectDragSource,
      isDragging
    } = this.props

    let editMe = (e) => {
      e.preventDefault()
      onEditClick({
        id,
        name,
        city,
        status,
        post 
      })
    }

    return connectDragSource(
      <div 
        className="job-display clickable flex noshrink" 
        onClick={editMe} 
      >
          <span>{name}</span>
      </div>
    )
  }
}

export default DragSource("JOB", jobSource, collect)(Job)
