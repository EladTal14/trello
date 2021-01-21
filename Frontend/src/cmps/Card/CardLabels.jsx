import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../../services/utilService'
import { eventBusService } from '../../services/eventBusService'
import { CSSTransition } from 'react-transition-group'
// import { cardService } from '../../services/cardService'
// TODO: maybe put in two cmps

class _CardLabels extends Component {

  state = {
    labels: [],
    isCreateLabel: false,
    currLabel: {
      id: '',
      title: '',
      color: '#f2d601'
    },
    colors: ['#f2d601', '#ff9f19', '#eb5a46', '#c377e0', '#0179bf', '#04c2e0',
      '#61bd50', '#50e898', '#ff78cb', '#344563', '#b3bac5'],
    // mounted: false
  }

  // onClose = () => {
  //   this.setState({ mounted: false })
  // }

  componentDidMount() {
    // const { labels } = this.props.currCard //fucked me up
    const { labels } = this.props.card
    if (labels) {
      this.setState(prevState => {
        return {
          ...prevState,
          labels: [...labels],
          mounted: true
        }
      })
    }
  }

  onEditClick = (label) => {
    this.setState(prevState => {
      return {
        ...prevState,
        isCreateLabel: true,
        currLabel: { ...label }
      }
    })
  }

  onHandleNewLabel = (val) => {
    let name = 'color'

    if (typeof (val) !== 'string') {
      val = val.target.value
      name = 'title'
    }

    this.setState(prevState => {
      return {
        ...prevState,
        currLabel: {
          ...this.state.currLabel,
          [name]: val
        }
      }
    })
  }

  onToggleLabel = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isCreateLabel: !this.state.isCreateLabel
      }
    })
  }

  onAddLabel = () => {
    const { currLabel } = this.state
    let labelsCopy = [...this.state.labels]

    if (!currLabel.id) {
      currLabel.id = utilService.makeId()
      labelsCopy.push(currLabel)
    } else {
      const idx = labelsCopy.findIndex((label) => label.id === currLabel.id)
      labelsCopy.splice(idx, 1, currLabel)
    }

    this.setState(prevState => {
      return {
        ...prevState,
        labels: [...labelsCopy]
      }
    }, () => {
      this.props.onHandleLabelsChange(this.state.labels)
      eventBusService.emit('label-added', currLabel)
      this.onToggleLabel()
      this.clearNewLabel()
    })
  }

  clearNewLabel = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        currLabel: {
          id: '',
          title: '',
          color: '#f2d601'
        }
      }
    })
  }

  onChooseLabel = (label) => {
    // const readyLabel = cardService.createLabel(label)
    const isDuplicated = this.checkForDuplicate(label)

    if (isDuplicated) {
      this.removeLabel(label)
      return
    }

    this.setState(prevState => {
      return {
        ...prevState,
        labels: [...prevState.labels, label]
      }
    }, () => this.props.onHandleLabelsChange(this.state.labels))
  }

  checkForDuplicate = (label) => {
    const { labels } = this.state
    if (!labels) return false

    const isFound = labels.find((currLabel) => currLabel.id === label.id)
    if (isFound) return true
  }

  removeLabel = (label, isClose = false) => {
    const labelsCopy = [...this.state.labels]
    const idx = labelsCopy.findIndex((currLabel) => currLabel.id === label.id)
    labelsCopy.splice(idx, 1)

    this.setState(prevState => {
      return {
        ...prevState,
        labels: labelsCopy
      }
    }, () => {
        this.props.onHandleLabelsChange(this.state.labels)
        if (isClose) this.props.onToggleLabels()
        this.clearNewLabel()
        this.onToggleLabel()
    })
  }

  checkForMark = (label) => {
    const { labels } = this.state

    const isFound = labels.find((currLabel) => currLabel.id === label.id)
    return isFound
  }

  onRemoveLabel = (label) => {
    this.removeLabel(label, true)
    eventBusService.emit('label-remove', label)
  }

  render() {
    const { board } = this.props
    const { isCreateLabel, colors, currLabel, mounted } = this.state
    return (
      <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleLabelMenu}>
        <div className="card-labels flex column" style={{ height: isCreateLabel ? '320px' : '450px' }}>

          <header className="labels-header flex">
            {isCreateLabel && <button className="go-back" onClick={this.onToggleLabel}> 〈</button>}
            <p>{!isCreateLabel ? 'Labels' : 'Create Label'}</p>
            <button className="close-btn inside-close" onClick={this.props.toggleLabelMenu}>✕</button>
          </header>

          {!isCreateLabel && <section className="label-choose-container flex column">
            <ul>
              {board.labels?.map((label) => (
                <li key={label.id} className="label flex">
                  <div className="label-title flex space-between" onClick={() => this.onChooseLabel(label)} style={{ backgroundColor: label.color }}>
                    <p>{label.title} </p>
                    <span className="checkmark">{this.checkForMark(label) ? '✓' : ''}</span>
                  </div>
                  <button className="label-edit-btn" onClick={() => this.onEditClick(label)}>
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
              value={currLabel.title}
              onChange={this.onHandleNewLabel}
            />
            <p>Select a color</p>
            <ul className="flex">
              {colors.map((color) => (
                <li
                  className="label-color-picker flex align-center justify-center"
                  key={color}
                  name="color"
                  style={{ backgroundColor: color }}
                  onClick={() => this.onHandleNewLabel(color)}
                >{currLabel.color === color ? '✓' : ''}</li>
              ))}
            </ul>
            <div className="flex space-between">
              <button className="save-btn" onClick={this.onAddLabel}>Create</button>
              {currLabel.id && <button className="delete-btn" onClick={() => this.onRemoveLabel(currLabel)}>Delete</button>}
            </div>
          </section>}

          {!isCreateLabel &&
            <footer>
              <button className="add-label-btn" onClick={this.onToggleLabel}>+ Create New Label</button>
            </footer>}

        </div>
      </CSSTransition>
    )
  }
}


const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard,
    currCard: state.cardModule.currCard
  }
}

const mapDispatchToProps = {
  // saveBoard,
}

export const CardLabels = connect(mapStateToProps, mapDispatchToProps)(_CardLabels)