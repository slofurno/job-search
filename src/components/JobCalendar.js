import React, { Component, PropTypes } from 'react'

const DAY = 1000 * 60 * 60 * 24

export default class JobCalendar extends Component {
  render () {
    const { jobs, history } = this.props

    let today = Date.now()
    let last = today - 60 * DAY
    let next = 0
    let days = []

    while ((next = last + DAY) <= today) {
      let m = history.filter(x => x.time > last && x.time < next) 
      days.push(m) 
      last += DAY
    }

    let blues = [
      "gainsboro",
      "azure",
      "skyblue",
      "deepskyblue",
      "royalblue"
    ]

    let dayDisplay = days.map((x,i) => {

      let colorIndex = Math.min(4, x.length);
      let bg = {
        backgroundColor: blues[colorIndex]
      }

      return (<div key={i} className="calendar-square" style={bg}></div>)
    })
 
    return (
      <div> {dayDisplay} </div>
    )
  }
}
