import React, { Component, PropTypes } from 'react'
import Since from './Since'

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
    const text = this.refs.text.value
    const url = this.refs.url.value
    const {id} = this.props.selectedJob
    this.props.updateJob({
      id, name, city, text, url
    })
  }

  render () {
    const {updateJob, deleteJob, selectedJob, addStatus, onDeleteHistory} = this.props

    if (!selectedJob.isSelected) {
      return (<div></div>)
    }

    const {history} = selectedJob

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
    }

    return (
      <div style={background} onClick={e => this.closeModal(e)}>
        <div className="modal" style={modalContainer} onClick={this.stopP}>
          <div className="card job-card flex column">
            <h3>{selectedJob.lastStatus}</h3>
            <input 
              className="job-display" 
              type="text"
              ref="name" 
              defaultValue={selectedJob.name}
              placeholder="company name" 
            />
            <input 
              className="job-display" 
              type="text" 
              ref="city" 
              defaultValue={selectedJob.city}
              placeholder="city" 
            />
            <textarea 
              rows="8"
              className="job-display flex grow" 
              ref="text"
              defaultValue={selectedJob.text}
            ></textarea>
            <input 
              className="job-display" 
              type="text"
              ref="url" 
              defaultValue={selectedJob.url}
            />
            <a className="link" href="#" onClick={(e) => this.handleClick(e)}>Save</a>
            <a className="link" href="#" onClick={(e) => e.preventDefault() || deleteJob(selectedJob)}>Delete</a>
            <ul>
              { history.map(({id, time, status}) => <li 
                  className="job-display"
                  key = {id}
                  onClick = {e => onDeleteHistory(id)}>{status}{"   "}<Since epoch={time}/></li>) }
            </ul>
          </div>
        </div>
      </div>
    )
  }

}
