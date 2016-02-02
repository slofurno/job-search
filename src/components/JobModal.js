import React, { Component, PropTypes } from 'react'

export default class JobModal extends Component {
  closeModal (e) {
    e.stopPropagation()
    console.log("CLOSE MODAL");
  }

  stopP (e) {
    e.stopPropagation()
  }

  render () {

    const {selectedJob} = this.props

    if (!selectedJob) {
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
      <div style={background} onClick={this.closeModal}>
        <div style={modalContainer} onClick={this.stopP}>
        <div className={"card"} 
             style={{
               backgroundColor:"ghostwhite"
             }}>
          <ul>
            <li>{selectedJob.name}</li>
            <li>{selectedJob.name}</li>
            <li>{selectedJob.name}</li>
            <li>{selectedJob.name}</li>
          </ul>
          </div>
        </div>
      </div>
    )
  }

}
