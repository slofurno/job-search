import React, { Component, PropTypes } from 'react'

const minute = 1000 * 60
const hour = minute * 60
const day = hour * 24

export default ({epoch}) => {
  let since = Date.now() - epoch
  
  if (since >= day) {
    let days = (since/day)|0
    return (<span>{`${days} days ago`}</span>)
  }

  if (since >= hour) {
    let hours = (since/hour)|0
    return (<span>{`${hours} hours ago`}</span>)
  }

  if (since >= minute) {
    let minutes = (since/minute)|0
    return (<span>{`${minutes} minutes ago`}</span>)
  }

  return (<span>{"just now"}</span>)
}
