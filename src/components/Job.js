import React, { Component, PropTypes } from 'react'

export default class Job extends Component {
  render() {
  const { 
    onEditClick, 
    id, 
    name, 
    city, 
    post, 
    status 
  } = this.props

	let mystatus = status || 2
	let width = `${(mystatus/5) * 100|0}%`
	let statusBar = <div className={"bargraph"} style={{width}}> </div>
  let editMe = () => onEditClick({
    id,
    name,
    city,
    status,
    post 
  })

    return (
      <div className={"card raised"}>
        <ul>
          <li> {name} </li>
          <li> {city} </li>
          <li> {post} </li>
					<li> {statusBar} </li>
          <li> <a href="#" onClick={editMe}>edit</a> </li>
        </ul>
      </div>
    )
  }

}
