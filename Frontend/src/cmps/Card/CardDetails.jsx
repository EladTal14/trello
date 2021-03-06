import { Component } from 'react'
import { connect } from 'react-redux'
import { CardHeader } from './CardHeader'
import { CardInfo } from './CardInfo'
import { clearState } from '../../store/actions/cardAction.js'
import { saveBoard } from '../../store/actions/boardAction.js'
import { CardSide } from './CardSide'
import { CSSTransition } from 'react-transition-group'
import { activityService } from '../../services/activityService'
import Loader from 'react-loader-spinner'

class _CardDetails extends Component {
  state = {
    card: null,
    filterBy: {
      fullname: ''
    },
    mounted: false,
    initialCard: null
  }

  componentDidMount() {
    const { card } = this.props
    this.setState({ mounted: true, card, initialCard: card })
  }

  onClose = () => {
    this.saveChanges(true)
    this.checklistValidation()
    this.setState({ mounted: false })
  }

  saveChanges = (isActivityUpdate = false) => {
    this.sendUpdatedBoard(isActivityUpdate)
  }

  sendUpdatedBoard = async (isActivityUpdate = false) => {
    const board = { ...this.props.board }
    const group = { ...this.props.group }
    const { card, initialCard } = this.state
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = card
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group

    if (isActivityUpdate && JSON.stringify(initialCard) !== JSON.stringify(card)) {
      var activity = activityService.createActivity(this.props.loggedInUser, 'update card ', card, board.groups[groupIdx], ' in')
      board.activities ? board.activities.unshift(activity) : board.activities = new Array(activity)
    }
    await this.props.saveBoard(board)
  }

  onHandleInputChange = ({ target }) => {
    const { value, name } = target
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        [name]: value
      }
    }), () => this.saveChanges())
  }

  onHandleChecklistChange = (checklist) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        checklist: { ...checklist }
      }
    }), () => this.saveChanges())
  }

  onHandleActivitiesChange = (comments) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        comments: [...comments]
      }
    }), () => this.saveChanges())
  }

  onHandleLabelsChange = (labels) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        labels: [...labels]
      }
    }), () => this.saveChanges())
  }

  addOrCancelChecklist = (checklist) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        checklist
      }
    }), () => this.saveChanges())
  }

  onSavedueDate = (date) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        dueDate: Date.parse(date)
      }
    }), () => this.saveChanges())
  }

  onUploadCardCoverImg = (url) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        style: { imgUrl: url, color: '' }
      }
    }), () => this.saveChanges())
  }

  onUpdateCoverColor = (color) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        style: { imgUrl: '', color: color }
      }
    }), () => this.saveChanges())
  }

  onRemoveDueDate = () => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        dueDate: ''
      }
    }), () => this.saveChanges())
  }

  onRemoveCard = () => {
    const { board, group } = this.props
    const { card } = this.state
    const cardIdx = group.cards.findIndex((currCard) => currCard.id === card.id)
    group.cards.splice(cardIdx, 1)
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.props.saveBoard(board)
    this.props.toggleDetails(false)
  }

  onUpdateMembers = async (member) => {
    const { board, group } = this.props
    const { card } = this.state
    const newCard = { ...card }
    const memberIdx = card.members.findIndex(currMember => currMember._id === member._id)
    if (memberIdx > -1) {
      newCard.members.splice(memberIdx, 1)
    } else {
      newCard.members.push(member)
    }
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = newCard
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group

    this.setState({ card: newCard }, () => { this.props.saveBoard(board) })
  }

  checklistValidation = () => {
    const { checklist } = this.state.card
    if (checklist && checklist.todos.length === 1 && !checklist.todos[0].title) {
      this.addOrCancelChecklist(null)
    }
  }

  onSetUserFilter = (filterBy) => {
    this.setState({ filterBy })
  }

  get usersForDisplay() {
    const { board } = this.props
    const { filterBy } = this.state;
    const filterRegex = new RegExp(filterBy.fullname, 'i');
    const users = board.members.filter(member => filterRegex.test(member.fullname))
    return users
  }

  onDeleteCover = () => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        style: null
      }
    }), () => this.saveChanges())
  }


  render() {
    const { card, mounted } = this.state
    const { group } = this.props
    const usersForDisplay = this.usersForDisplay
    if (!card) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>

    return (
      <div className="modal-cover" onClick={this.onClose}>
        <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleDetails}>
          <div className="card-details flex column align-center" onClick={ev => ev.stopPropagation()}>
            <button className="close-modal-btn" onClick={this.onClose}>✕</button>
            {card.style?.color &&
              <div className="details-img-wrapper" style={{ backgroundColor: card.style.color, height: '150px' }}>
                <img onClick={this.onDeleteCover} src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" className="trash" alt="" />
              </div>
            }

            {
              card.style?.imgUrl &&
              <div className="details-img-wrapper flex justify-center" style={{ height: '200px' }}>
                <img src={card.style.imgUrl} alt="" />
                <img onClick={this.onDeleteCover} src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" className="trash" alt="" />
              </div >}

            <div className="card-details-wrapper flex column" style={{ paddingTop: (card.style?.imgUrl || card.style?.color) ? '0' : '15px' }}>
              <CardHeader card={card} onHandleInputChange={this.onHandleInputChange} group={group} />
              <div className="card-content flex">
                <CardInfo
                  card={card}
                  onHandleChecklistChange={this.onHandleChecklistChange}
                  onHandleInputChange={this.onHandleInputChange}
                  onHandleActivitiesChange={this.onHandleActivitiesChange}
                  addOrCancelChecklist={this.addOrCancelChecklist}
                  onRemoveDueDate={this.onRemoveDueDate}
                />
                <CardSide
                  card={card}
                  onRemoveCard={this.onRemoveCard}
                  onSavedueDate={this.onSavedueDate}
                  addOrCancelChecklist={this.addOrCancelChecklist}
                  onUploadCardCoverImg={this.onUploadCardCoverImg}
                  onHandleLabelsChange={this.onHandleLabelsChange}
                  onUpdateCoverColor={this.onUpdateCoverColor}
                  saveChanges={this.saveChanges}
                  users={usersForDisplay}
                  onUpdateMembers={this.onUpdateMembers}
                  onSetUserFilter={this.onSetUserFilter}
                />
              </div>
            </div>
          </div >
        </CSSTransition >
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  saveBoard,
  clearState
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)