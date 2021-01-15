import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import { CardHeader } from './CardHeader';
import { CardInfo } from './CardInfo';

// import { eventBusService } from '../services/eventBusService.js'
import { clearState } from '../store/actions/cardAction.js'
import { saveBoard } from '../store/actions/boardAction.js'

class _CardDetails extends Component {

  state = {
    card: null
  }

  componentDidMount() {
    const { card } = this.props
    this.setState({ card })
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.sendUpdatedBoard()
      this.props.clearState(null)
    } else {
      console.log('okey okey')
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
    }), () => console.log('state whitecheklistchange', this.state))

  }

  render() {
    const { card } = this.state
    const { group } = this.props
    // const currGroup = this.props.currGroup
    if (!card) return <div>Loading...</div>
    // let cardWithTxt = (
    //   <input
    //     className="title-input my-input"
    //     type="text"
    //     name="title"
    //     value={card.title}
    //     onChange={this.onHandleInputChange}
    //     placeholder={card.title}
    //   />
    // )
    // {cardWithTxt}

    return (
      <div className="card-details flex justify-center align-center">

        <div className="card-details-wrapper flex column">
          <CardHeader card={card} onHandleInputChange={this.onHandleInputChange} group={group} />

          <div className="card-content flex">
            <CardInfo card={card} onHandleChecklistChange={this.onHandleChecklistChange} onHandleInputChange={this.onHandleInputChange} />
            <div className="card-side flex column">
              <button className="side-btn"><span>L</span> Members</button>
              <button className="side-btn"><span>L</span> Labels</button>
              <button className="side-btn"><span>L</span> Checklist</button>
              <button className="side-btn"><span>L</span> Due date</button>
              <button className="side-btn"><span>L</span> Cover</button>
              <button className="side-btn"><span>L</span> Delete</button>
            </div>

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


export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails);