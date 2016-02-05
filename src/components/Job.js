import React, { Component, PropTypes } from 'react'


export default class Job extends Component {
  render() {
    const { 
      onEditClick, 
      onDeleteClick,
      id, 
      name, 
      city, 
      post, 
      status 
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

    let deleteMe = (e) => {
      e.preventDefault()
      onDeleteClick({
        id
      })
    }

    return (
      <div 
        className="job-display" 
        onClick={editMe} 
      >
          <span>{name}</span>
          <span>{city}</span>
      </div>
    )
  }

}
