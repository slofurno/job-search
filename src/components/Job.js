import React, { Component, PropTypes } from 'react'

export default class Job extends Component {
  render() {
    return (
      <div>
        <ul>
          <li> {this.props.name} </li>
          <li> {this.props.city} </li>
          <li> {this.props.post} </li>
        </ul>
      </div>
    )
  }

}
