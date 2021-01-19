import { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { CardHeader } from './CardHeader'
import { CardInfo } from './CardInfo'
import { clearState } from '../../store/actions/cardAction.js'
import { saveBoard } from '../../store/actions/boardAction.js'
import { CardSide } from './CardSide'
// TODO: find a way to merge all handle inputs
// TODO: go back to handle click outside async lielm1995

class _CardDetails extends Component {
  state = {
    card: null,
    filterBy: {
      fullname: ''
    }
  }

  componentDidMount() {
    const { card } = this.props
    this.setState({ card })
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this)
    if (!domNode || !domNode.contains(event.target)) {
      this.saveChanges()
      // this.props.clearState(null)
    }
  }

  saveChanges = () => {
    this.checklistValidation()
    this.sendUpdatedBoard()
  }

  sendUpdatedBoard = () => {
    const { board, group } = this.props
    const { card } = this.state
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = card
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.props.saveBoard(board)
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
    console.log('comments', comments)
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
    }))
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

  onSavedueDate = (date) => {
    const { card } = this.state
    const newCard = { ...card }
    newCard.dueDate = Date.parse(date)
    this.onUpdateCard(newCard)
  }

  onUploadCardCoverImg = (url) => {
    const { card } = this.state
    const newCard = { ...card }
    const style = { imgUrl: url, color: '' }
    newCard.style = style
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

  onUpdateCoverColor = (color) => {
    const { card } = this.state
    const newCard = { ...card }
    const style = { imgUrl: '', color: color }
    newCard.style = style
    this.onUpdateCard(newCard)
  }

  onUpdateMembers = async (member) => {
    console.log('new members', member);
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



  render() {
    const { card } = this.state
    const { group } = this.props
    const usersForDisplay = this.usersForDisplay
    if (!card) return <div>Loading...</div>

    return (
      <div className="card-details flex column align-center">

        {card.style &&
          card.style.color &&
          <div className="details-img-wrapper" style={{ backgroundColor: card.style.color, height: '150px' }}>
          </div>}

        {card.style &&
          card.style.imgUrl &&
          <div className="details-img-wrapper flex justify-center" style={{ height: '200px' }}>
            <img src={card.style.imgUrl} alt="" />
          </div>}

        <div className="card-details-wrapper flex column">
          <CardHeader card={card} onHandleInputChange={this.onHandleInputChange} group={group} />
          <div className="card-content flex">
            <CardInfo
              card={card}
              onHandleChecklistChange={this.onHandleChecklistChange}
              onHandleInputChange={this.onHandleInputChange}
              onHandleActivitiesChange={this.onHandleActivitiesChange}
              addOrCancelChecklist={this.addOrCancelChecklist}
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
  saveBoard,
  clearState
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)