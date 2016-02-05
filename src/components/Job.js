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
      status,
      history
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

    let lastEdit = history.slice(-1)[0]
    console.log("last edit", lastEdit)
    let editDate = lastEdit ? (new Date(lastEdit.time)).toLocaleDateString() + " - " : ""

    return (
      <div 
        className="job-display clickable flex noshrink" 
        onClick={editMe} 
      >
          <span>{editDate}</span>
          <span>  </span>
          <span>{name}</span>
      </div>
    )
  }

}
