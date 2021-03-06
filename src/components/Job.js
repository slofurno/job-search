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
      onClick, 
      id, 
      name, 
      city, 
      url, 
      text,
      connectDragSource,
      isDragging
    } = this.props

    return connectDragSource(
      <div 
        className="job-display clickable flex noshrink" 
        onClick={onClick} 
      >
          <span>{name}</span>
      </div>
    )
  }
}

export default DragSource("JOB", jobSource, collect)(Job)
