import React, { Component } from 'react'
import { connect } from 'react-redux'
// TODO: maybe put in two cmps

class _CardLabels extends Component {

  state = {
    isCreateLabel: false,
    colors: ['#f2d601', '#ff9f19', '#eb5a46', '#c377e0', '#0179bf', '#04c2e0',
      '#61bd50', '#50e898', '#ff78cb', '#344563', '#b3bac5']
  }

  onEditClick = () => {
    console.log('editing')


  }

  onAddLabel = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isCreateLabel: !this.state.isCreateLabel
      }
    })
  }

  render() {
    const { board } = this.props
    const { isCreateLabel, colors } = this.state
    return (
      <div className="card-labels flex column" style={{height: isCreateLabel ? '320px' : '450px'}} >

        <header className="labels-header flex">
          <p>{!isCreateLabel ? 'Labels' : 'Create Label'}</p>
          <button className="close-btn" onClick={this.props.onToggleLabels}>✕</button>
        </header>

        {!isCreateLabel && <section className="label-choose-container flex column">
          <ul>
            {board.labels.map((label, idx) => (
              <li key={idx} className="label flex">
                <span className="label-title" style={{ backgroundColor: label.color }}>{label.title}</span>
                <button className="label-edit-btn" onClick={this.onEditClick}>
                  <img src="https://res.cloudinary.com/basimgs/image/upload/v1610872377/pen_so2afr.png" alt="" />
                </button>
              </li>
            ))}
          </ul>
        </section>}

        {isCreateLabel && <section className="create-label-container flex column">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            placeholder="Enter label name..."
            name="title"
            id="title"
          />
          <p>Select a color</p>
          <ul className="flex">
            {colors.map((color, idx) => (
              <li className="label-color-picker" key={idx} style={{ backgroundColor: color }}></li>
            ))}
          </ul>
          <button className="save-btn" onClick={this.onAddLabel}>Create</button>
        </section>}

        <footer>
          {!isCreateLabel && <button className="add-label-btn" onClick={this.onAddLabel}>+ Create New Label</button>}
          {/* {isCreateLabel && <button className="save-btn" onClick={this.onAddLabel}>Create</button>} */}
        </footer>

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard,
  }
}

const mapDispatchToProps = {
  // saveBoard,
  // clearState
}

export const CardLabels = connect(mapStateToProps, mapDispatchToProps)(_CardLabels)