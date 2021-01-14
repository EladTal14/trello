import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';

import { CardHeader } from './CardHeader';
import { CardInfo } from './CardInfo';

import { saveBoard } from '../store/actions/boardAction.js'

class _CardDetails extends Component {

  state = {
    card: null,
    isAddOpen: false
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
    } else if(this.state.isAddOpen) {
      console.log('okey okey')
    }
  }

  sendUpdatedBoard = () => {
    const { board } = this.props
    const { group } = this.props
    const { card } = this.state
    const boardCopy = { ...board }
    const groupCopy = { ...group }

    const cardIdx = groupCopy.cards.findIndex((card) => card.id === this.state.card.id)
    groupCopy.cards[cardIdx] = card

    const groupIdx = boardCopy.groups.findIndex((currGroup) => currGroup.id === group.id)
    boardCopy.groups[groupIdx] = groupCopy
    this.props.saveBoard(boardCopy)
  }

  onHandleInputChange = ({ target }) => {
    const { value } = target
    const { name } = target

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

  openTodoAdd = () => {
    this.setState(prevState => {
      return {
       ...prevState,
       isAddOpen: !prevState.isAddOpen
      }
    })
  }

  render() {
    const { card } = this.state
    const { groupTitle } = this.props
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
          <CardHeader card={card} onHandleInputChange={this.onHandleInputChange} groupTitle={groupTitle} />

          <div className="card-content flex">
            <CardInfo card={card} onHandleChecklistChange={this.onHandleChecklistChange} onHandleInputChange={this.onHandleInputChange} openTodoAdd={this.openTodoAdd} />
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
  // loadBoard,
  saveBoard,
}



export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails);