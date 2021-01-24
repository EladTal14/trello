import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventBusService } from '../../services/eventBusService'
import { utilService } from '../../services/utilService'
import { toggleAddCard } from '../../store/actions/cardAction.js'

export class CardAddForm extends Component {
  state = {
    card: {
      title: ''
    },
    isAddOpen: false,
    groupId: null
  }
  componentDidMount() {
    this.eventBusTerminate = eventBusService.on('open-card-add', this.openCardAdd)
  }

  componentWillUnmount() {
    this.eventBusTerminate()
  }

  openCardAdd = ({ isAddOpen, groupId }) => {
    if (this.props.groupId === groupId)
      this.setState({ isAddOpen: isAddOpen, groupId })
  }

  handleInput = ({ target }) => {
    const { name } = target
    const { value } = target
    this.setState(prevState => {
      return {
        card: {
          ...prevState.card,
          [name]: value
        }
      }
    })
  }

  closeInput = () => {
    this.setState({ isAddOpen: false, card: { title: '' } }, () => {
      eventBusService.emit('close-card-add', false, this.state.groupId)
      setTimeout(() => {
        this.props.onScroll(null, 1000)
      }, 150)
    })
  }

  onSaveCard = (ev) => {
    ev.preventDefault()
    if (!this.state.card.title) return
    const card = { title: this.state.card.title, id: utilService.makeId(), members: [], labels: [] }
    this.props.onAddCard(card, this.props.groupId)
    this.closeInput()
  }

  render() {
    const { isAddOpen, card } = this.state
    return (
      <div className="add-card-container">
        { isAddOpen &&

          <form onSubmit={this.onSaveCard} className="new-card-form" >
            {/* <div style={{ height: 40 }}></div> */}
            {/* <textarea type="text" name="title" value={card.title} onChange={this.handleInput} onBlur={this.closeInput} */}
            <textarea type="text" name="title" value={card.title} onChange={this.handleInput}
              className="my-input" placeholder="Enter a card title..." autoFocus required
              cols="35" rows="4"></textarea>
            <div className="flex" style={{ marginTop: 5 }}>
              <button className="submit-card-btn">Add card</button>
              <button onMouseDown={this.closeInput} className="close-input-btn" >
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610646476/close_voj9v3.png" alt="" />
              </button>
            </div>
          </form>
        }
      </div >
    )
  }
}


