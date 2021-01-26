import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardLabels } from './CardLabels'
import Calendar from 'react-calendar';
import { saveBoard } from '../../store/actions/boardAction'
import { AddMember } from '../AddMember';
import Loader from 'react-loader-spinner'
import { utilService } from '../../services/utilService';

class _CardPreviewDetails extends Component {
  state = {
    card: null,
    userClicked: null,
    isCreateLabel: false,
    isChangeMembers: false,
    isChangeDueDate: false,
    value: new Date(),
    modalChangePos: null
  }

  componentDidMount() {
    this.setState({ card: this.props.card, userClicked: this.props?.userClicked })
  }

  componentWillUnmount() {
    this.setState({
      card: null,
      userClicked: null,
      isCreateLabel: false,
      isChangeMembers: false,
      isChangeDueDate: false,
    })
  }
  modalRef = React.createRef()
  modalLabelRef = React.createRef()

  closeModal = () => {
    this.modalRef.current.style.visibility = 'hidden'
    this.props.showPreviewCardDetails()
  }

  toggleLabelMenu = (ev) => {
    const pos = this.getNewPos(ev, 300, 450)

    this.setState({ isCreateLabel: !this.state.isCreateLabel, modalChangePos: pos })
  }

  showMembers = (ev) => {
    const pos = this.getNewPos(ev, 300, 450)
    this.setState({ isChangeMembers: !this.state.isChangeMembers, modalChangePos: pos })
  }

  showDueDate = (ev) => {
    const pos = this.getNewPos(ev, 340, 288)
    this.setState({ isChangeDueDate: !this.state.isChangeDueDate, modalChangePos: pos })
  }

  onHandleInputChange = ({ target }) => {
    const { value, name } = target
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

  onUpdateMembers = async (member) => {
    const copyCard = { ...this.state.card }
    const memberIdx = copyCard.members.findIndex(currMember => currMember._id === member._id)
    if (memberIdx > -1) {
      copyCard.members.splice(memberIdx, 1)
      this.setState({ card: copyCard })
    } else {
      copyCard.members.push(member)
      this.setState({ card: copyCard })

    }
    this.onUpdateCard(this.state.card)
  }

  onUpdateCard = (updatedCard, isSave = null) => {
    const { board, group } = this.props
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = updatedCard
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.setState({ card: updatedCard }, () => {
      this.props.saveBoard(board)
      if (isSave) this.closeModal()
    })
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

  getNewPos = (ev, width, height) => {
    const size = { width, height }
    if (!ev) return
    return utilService.getModalPos(ev, size)
  }

  render() {
    const { userClicked, card, isCreateLabel, isChangeMembers, isChangeDueDate, value, modalChangePos } = this.state
    if (!card) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>
    return (
      <>
        <div className="wrapper-preview-details" ref={this.modalRef} onClick={this.closeModal} style={{
          position: 'absolute',
          zIndex: 9000, top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'black', opacity: 0.5
        }}></div>
        <div className="card-preview-details flex" style={{
          position: 'absolute',
          top: userClicked.y,
          left: userClicked.x,
          zIndex: 10000
        }}>
          <div className="flex column space-between">
            <textarea className="card-preview-details-textarea" name="title" cols="28" wrap="hard" rows="8" onChange={this.onHandleInputChange} value={card.title} autoFocus ></textarea>
            <button className="card-preview-details-save" onClick={() => this.onUpdateCard(card, 'save')}>Save</button>
          </div>
          <div className="card-preview-details-changes flex column">
            <button className="card-preview-details-changes-btn" onClick={this.toggleLabelMenu}><span className="card-preview-details-changes-icon">
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610794160/price-tag_evse4z.png" alt="label" />
            </span>Edit Labels</button>
            {isCreateLabel &&
              <div className="card-preview-details-label-wrap" style={{ top: -modalChangePos.y, right: -130 }}>
                <CardLabels toggleLabelMenu={this.toggleLabelMenu}
                  onHandleLabelsChange={this.onHandleLabelsChange} card={card} /></div>}
            <button className="card-preview-details-changes-btn flex space-between"
              onClick={this.showMembers}><span className="card-preview-details-changes-icon">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="member" />
              </span><span style={{ flexGrow: 1 }}>Change Members</span>
            </button>
            {isChangeMembers && <AddMember
              modalChangePos={modalChangePos}
              toggleMembers={this.showMembers}
              onUpdateMembers={this.onUpdateMembers}
              onSetUserFilter={this.props.onSetUserFilter} members={card.members}
              users={this.props.board.members} />}
            <button className="card-preview-details-changes-btn" onClick={this.showDueDate}>
              <span className="card-preview-details-changes-icon">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="clock" />
              </span><span style={{ flexGrow: 1 }}> Change Due Date</span></button>
            {isChangeDueDate && <div className="date-picker " style={{ position: "fixed", top: modalChangePos.y - 30, left: modalChangePos.x }}>
              <button onClick={this.showDueDate} className="close-date-btn">✕</button>
              <Calendar
                onChange={this.onChange}
                value={value} />
            </div>}
            <button className="card-preview-details-changes-btn" onClick={this.onRemoveCard}>
              <span className="card-preview-details-changes-icon">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" alt="Trash" />
              </span>
              <span style={{ flexGrow: 1, textAlign: 'left' }}>Delete</span></button>
          </div>

        </div>

      </>
    )
  }
}


const mapStateToProps = (state) => ({
  board: state.boardModule.currBoard,
})

const mapDispatchToProps = {
  saveBoard
}

export const CardPreviewDetails = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewDetails)
