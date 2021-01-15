import React, { Component } from 'react'

export class CardSide extends Component {

  render() {
    return (
      <div className="card-side flex column">
        <button className="side-btn"><span>L</span> Members</button>
        <button className="side-btn"><span>L</span> Labels</button>
        <button className="side-btn"><span>L</span> Checklist</button>
        <button className="side-btn"><span>L</span> Due date</button>
        <button className="side-btn"><span>L</span> Cover</button>
        <button className="side-btn"><span>L</span> Delete</button>
      </div>
    )
  }
}
