import React, { Component } from 'react'

export class CardLabels extends Component {

  render() {
    return (
      <div className="card-labels flex column">

        <header className="labels-header flex">
          <p>Labels</p>
          <button className="close-btn" onClick={this.props.onToggleLabels}>✕</button>
        </header>

        <section className="label-choose-container flex column">
          <span>aaa</span>
        </section>
        
        <footer>
          <button className="add-label-btn">+ Create New Label</button>
        </footer>

      </div>
    )
  }
}
