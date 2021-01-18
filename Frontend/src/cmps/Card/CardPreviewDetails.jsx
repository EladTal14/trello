import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardLabels } from './CardLabels'
import Calendar from 'react-calendar';
import { saveBoard } from '../../store/actions/boardAction'

class _CardPreviewDetails extends Component {
  state = {
    card: null,
    userClicked: null,
    isCreateLabel: false,
    isChangeMembers: false,
    isChangeDueDate: false,
    value: new Date()
  }

  componentDidMount() {
    // this.setState({ card: this.props.card }, () => console.log(this.state.card))
    this.setState({ card: this.props.card, userClicked: this.props?.userClicked },
      () => console.log(this.state))
  }

  modalRef = React.createRef()
  modalLabelRef = React.createRef()

  closeModal = () => {
    this.modalRef.current.style.visibility = 'hidden'
    this.props.showPreviewCardDetails()
  }

  showLabel = () => {
    this.setState({ isCreateLabel: !this.state.isCreateLabel })
  }
  showMembers = () => {
    this.setState({ isChangeMembers: !this.state.isChangeMembers })
  }
  showDueDate = () => {
    this.setState({ isChangeDueDate: !this.state.isChangeDueDate })
  }

  onHandleInputChange = ({ target }) => {
    const { value, name } = target
    console.log(target, name, value);
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        [name]: value
      }
    }))
  }
  onHandleLabelsChange = (labels) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        labels: [...labels]
      }
    }), () => this.onUpdateCard(this.state.card))
  }

  onChange = (value) => {
    this.setState({ value }, () => this.onSavedueDate((this.state.value + '').substring(4, 32)))
    this.showDueDate()
  }

  onSavedueDate = (date) => {
    const { card } = this.state
    const newCard = { ...card }
    newCard.dueDate = Date.parse(date)
    this.onUpdateCard(newCard)
  }

  onUpdateCard = (updatedCard) => {
    const { board, group } = this.props
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = updatedCard
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.setState({ card: updatedCard }, () => { this.props.saveBoard(board) })
  }

  onRemoveCard = () => {
    const { board, group } = this.props
    const { card } = this.state
    const cardIdx = group.cards.findIndex((currCard) => currCard.id === card.id)
    group.cards.splice(cardIdx, 1)
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.props.saveBoard(board)
    this.closeModal()
  }

  render() {
    const { userClicked, card, isCreateLabel, isChangeMembers, isChangeDueDate, value } = this.state
    const { board } = this.props
    console.log(userClicked, card);
    if (!card) return <div>Loading...</div>
    return (
      <>
        <div className="wrapper-preview-details" ref={this.modalRef} onClick={this.closeModal} style={{
          backgroundColor: 'red', position: 'absolute',
          zIndex: 9000, top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'black', opacity: 0.5
        }}></div>
        <div className="card-preview-details flex" style={{
          position: 'absolute',
          zIndex: 10000, top: userClicked?.y, left: userClicked?.x - 217
        }}>
          <div className="flex column">
            <textarea name="title" cols="28" wrap="hard" rows="8" onChange={this.onHandleInputChange} value={card.title} style={{ resize: 'none' }} autoFocus ></textarea>
            <button onClick={() => this.onUpdateCard(card)}>Save</button>
          </div>
          <div className="card-preview-details-changes flex column">
            <button onClick={this.showLabel}>Edit Labels</button>
            {isCreateLabel && <CardLabels onToggleLabels={this.showLabel} onHandleLabelsChange={this.onHandleLabelsChange} card={card} />}
            <button>Change Members</button>
            <button onClick={this.showDueDate}>Change Due Date</button>
            {isChangeDueDate && <div className="date-picker">
              <button onClick={this.showDueDate} className="close-date-btn">✕</button>
              <Calendar onChange={this.onChange} value={value} />
            </div>}
            <button onClick={this.onRemoveCard}>Delete</button>
          </div>

        </div>

      </>
    )
  }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  saveBoard
}

export const CardPreviewDetails = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewDetails)
