import React, { Component, PropTypes } from 'react'

export default class JobModal extends Component {
  closeModal (e) {
    e.stopPropagation()
		this.props.cancelModal()
  }

  stopP (e) {
    e.stopPropagation()
  }


  handleClick(e) {
		e.preventDefault()
    const name = this.refs.name.value
    const city = this.refs.city.value
		const post = " HEY"	
		const {id, status} = this.props.selectedJob
    this.props.updateJob({
			id, name, city, post, status
		})
  }

  render () {

    const {updateJob, selectedJob} = this.props

    if (!selectedJob.isSelected) {
      return (<div></div>)
    }

    let background = {
      position: "fixed",
      display: "relative",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      backgroundColor: "RGBA(0,0,0,.4)"
    }

    let modalContainer = {
      position: "absolute",
      margin: "auto",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      width: "400px",
      height: "400px"
    }

    return (
      <div style={background} onClick={e => this.closeModal(e)}>
        <div style={modalContainer} onClick={this.stopP}>
        <div className={"card"} 
             style={{
               backgroundColor:"ghostwhite"
             }}>
          <ul>
            <li>
            <input type="text" ref="name" defaultValue={selectedJob.name}/>
            </li>

            <li>
            <input type="text" ref="city" defaultValue={selectedJob.city}/>
            </li>

            <li><a href="#" onClick={(e) => this.handleClick(e)}>Save</a></li>
          </ul>
          </div>
        </div>
      </div>
    )
  }

}
