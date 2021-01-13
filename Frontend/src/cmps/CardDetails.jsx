import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { CardHeader } from './CardHeader';
import {boardService} from '../services/boardService.js'

export class CardDetails extends Component {

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
      console.log('send the card')

    }
  }

  updateCard = async (card, groupId) => {
    // const { board } = this.props
    // const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
    // console.log('index', groupIdx)
    // board.groups[groupIdx].cards.push(card)
    // console.log('saving... new board', board.groups);
    // await this.props.saveBoard(board)
    // this.loadBoard()
  }

  onHandleInputChange = ({ target }) => {
    const { value } = target
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        title: value
      }
    }), () => console.log(this.state.card))
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

            <div className="card-info">
              <div className="members">
                <h2>Members</h2>
                <div className="member">BK</div>
              </div>

              <div className="labels">
                <h2>labels</h2>
                <button className="label-btn">Done</button>
              </div>

              <div className="due-date-wrapper">
                <h2>due date</h2>
                <p className="due-date">Jan 4 at 3:33</p>
              </div>

              <div className="description">
                <h2>Description</h2>
                <textarea
                  className="desc-textarea my-input"
                  type="text"
                  name="description"
                  value={card.title}
                  onChange={this.onHandleInputChange}
                  placeholder={card.title}
                />
              </div>

              <div className="checklist flex column">
                <div className="checklist-header flex">
                  <span>L </span>
                  <input
                    className="my-input"
                    type="text"
                    name="checklist"
                    placeholder="Checklist"
                    value={card.title}
                    onChange={this.onHandleInputChange}
                  />
                </div>
                <div className="progress-bar"><div style={{ width: "40%" }}></div></div>
                <div className="checklist-todo flex">
                  <input
                    type="checkbox"
                  />
                  <input
                    className="add-todo-input my-input"
                    type="text"
                    name="todo"
                    placeholder="Add an item"
                    value={card.title}
                    onChange={this.onHandleInputChange}
                  />
                  <button>✕</button>
                </div>
                <button className="add-todo">Add todo</button>
              </div>

              <div className="activity-container">
                <div className="activity-header">
                  <span>L </span>
                  <span>Activity</span>
                </div>
                <div className="flex">
                  <div className="member">BK</div>
                  <textarea
                    className="activity-textarea"
                    type="text"
                    name="activity"
                    value={card.title}
                    onChange={this.onHandleInputChange}
                    placeholder={card.title}
                  />
                </div>
                <div className="activity-comment-wrapper flex">
                  <div className="member">BK</div>
                  <div className="activity-comment">
                    <p>comment area this is the</p>
                    <span>Time </span>
                  </div>
                </div>
              </div>

            </div>

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

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(CardEdit)