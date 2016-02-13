import React, { PropTypes } from 'react'

const Job = ({ 
      onEditClick, 
      id, 
      name, 
      city, 
      post, 
      status
    }) => { 

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

    return (
      <div 
        className="job-display clickable flex noshrink" 
        onClick={editMe} 
      >
          <span>{name}</span>
      </div>
    )
  }

export default Job
