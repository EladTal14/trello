import React, { Component } from 'react'
// import { BoardFilter } from './BoardFilter'
import { utilService } from '../services/utilService'
import { saveBoard } from '../store/actions/boardAction'
import { connect } from 'react-redux'

export class _BoardHeader extends Component {

  state = {
    board: {
        title: this.props.board.title,

    }
}

// componentDidMount() {
//     const boardId = this.props.board.id
//     const boardIdx = board.boards.findIndex(board => board.id === boardId)
//     this.setState({ boardIdx })
//     // document.addEventListener('click', this.handleClickOutside, true);
// }

handleInput = ({ target }) => {
    const { name } = target
    const value = target.value
    this.setState(prevState => {
        return {
            board: {
                ...prevState.board,
                [name]: value
            }
        }
    })
}

onSaveTitle = async (ev) => {
  ev.preventDefault()
  const { board } = this.props
  const { title } = this.state.board
  board.title = title
  await this.props.saveBoard(board)
}


  render() {
    const { members } = this.props
    const { board } = this.state
    // console.log('memebers...', members)
    return (
      <header className="board-header flex space-between">
        <div className="header-options flex">
          {/* <h2>{title}</h2> */}
          <form onSubmit={this.onSaveTitle} onBlur={this.onSaveTitle} className="board-title-form flex space-between">
                <input type="text" name="title" value={board.title} onChange={this.handleInput}
                    className="board-title-input" placeholder="Enter board title..." autoComplete="off" />
            </form>
          <button className="board-header-btn flex space-around">
            <h3>Statistics</h3>
            <img src="https://res.cloudinary.com/basimgs/image/upload/v1610626728/pie-chart_fnvwct.png" alt="" />
          </button>
          <div className="header-members flex">
            <ul className="member-list flex">
              {members.map(member => {
                return <li key={member._id} className="header-member">
                  {utilService.convertName(member.fullname)}
                </li>
              })}
            </ul>
            <div className="add-member">
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625640/add-user_qxgidw.png" alt="" />
            </div>
          </div>
        </div>
        {/* <BoardFilter /> */}
        <button className="menu-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610637597/menu_btis53.png" alt="" /></button>

      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
      board: state.boardModule.currBoard,
      // filterBy: state.boardModule.filterBy,
      // loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  saveBoard,
}



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);