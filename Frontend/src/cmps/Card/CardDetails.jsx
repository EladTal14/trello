import { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { CardHeader } from './CardHeader'
import { CardInfo } from './CardInfo'
import { clearState } from '../../store/actions/cardAction.js'
import { saveBoard } from '../../store/actions/boardAction.js'
import { CardSide } from './CardSide'
// TODO: find a way to merge all handle inputs

class _CardDetails extends Component {
  state = {
    card: null
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
      this.checklistValidation()
      this.sendUpdatedBoard()
      this.props.clearState(null)
    }
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
    }))
  }

  onHandleChecklistChange = (checklist) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        checklist: { ...checklist }
      }
    }))
  }

  onHandleActivitiesChange = (comments) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        comments: { ...comments }
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
    const { board, group } = this.props
    const { card } = this.state
    card.dueDate = Date.parse(date)
    const cardIdx = group.cards.findIndex((card) => card.id === this.state.card.id)
    group.cards[cardIdx] = card
    const groupIdx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
    board.groups[groupIdx] = group
    this.props.saveBoard(board)
  }

  addOrCancelChecklist = (checklist) => {
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        checklist
      }
    }))
  }

  checklistValidation = () => {
    if (this.state.card.checklist) {
      if (this.state.card.checklist.todos.length === 1 && !this.state.card.checklist.todos[0].title ) {
        this.addOrCancelChecklist(null)
      }
    }
  }

  render() {
    const { card } = this.state
    const { group } = this.props
    if (!card) return <div>Loading...</div>
    // let cardWithTxt = {}

    return (
      <div className="card-details flex justify-center align-center">
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