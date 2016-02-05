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
    const post = this.refs.post.value
		const {id, status} = this.props.selectedJob
    this.props.updateJob({
			id, name, city, post, status
		})
  }

  render () {

    const {updateJob, selectedJob, addStatus} = this.props

    if (selectedJob.id < 0) {
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

    /*
    let jobStatus = "nothing"

    if (selectedJob.history && selectedJob.history.length > 0) {
      jobStatus = selectedJob.history.slice(-1)[0].status
    }
    */

    return (
      <div style={background} onClick={e => this.closeModal(e)}>
        <div style={modalContainer} onClick={this.stopP}>
          <div className="card job-card">
            <input 
              className="job-display" 
              type="text" ref="name" 
              defaultValue={selectedJob.name}
              placeholder="company name" 
            />
            <input 
              className="job-display" 
              type="text" ref="city" 
              defaultValue={selectedJob.city}
              placeholder="city" 
            />
            <textarea 
              rows="8" className="job-display" 
              ref="post" defaultValue={selectedJob.post}
            ></textarea>
            <input 
              className="job-display" 
              type="text" ref="status" 
              defaultValue={selectedJob.lastStatus}
            />
            <a className="link" href="#" onClick={(e) => this.handleClick(e)}>Save</a>
            <a className="link" href="#" onClick={(e) => addStatus({job:selectedJob.id, status:"tevs"})}>Move >>></a>
          </div>
        </div>
      </div>
    )
  }

}
