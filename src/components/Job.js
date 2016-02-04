import React, { Component, PropTypes } from 'react'

const statuses = [
  "nothing",
  "applied",
  "interview scheduled",
  "interviewed"
]

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
      <div style={{padding:"12px 2px"}}>
          <span className="fake-input">{name}</span>
          <span className="fake-input">{city}</span>
          <a href="#" onClick={editMe} className="small">edit</a>
          <span>  </span>
          <a href="#" onClick={deleteMe} className="small">delete</a>
      </div>
    )
  }

}
