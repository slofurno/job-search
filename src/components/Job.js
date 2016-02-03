import React, { Component, PropTypes } from 'react'

export default class Job extends Component {
  render() {
    const { 
      onEditClick, 
      onDeleteClick,
      history,
      id, 
      name, 
      city, 
      post, 
      status 
    } = this.props

    let mystatus = status || 2
    let width = `${(mystatus/5) * 100|0}%`
    let statusBar = <div className={"bargraph"} style={{width}}> </div>
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

    let statusHistory = history.map(x => {
      return <li key={x.id}>{(new Date(x.time)).toLocaleString()}</li> 
    })

    return (
      <div className={"card raised"}>
        <ul>
          <li> {name} </li>
          <li> {city} </li>
          <li> {post} </li>
					<li> <ul> {statusHistory} </ul> </li>
          <li> <a href="#" onClick={editMe}>edit</a> </li>
          <li> <a href="#" onClick={deleteMe}>delete</a> </li>
        </ul>
      </div>
    )
  }

}
