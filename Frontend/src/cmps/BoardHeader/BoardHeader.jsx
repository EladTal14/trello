import React, { Component } from 'react'
import { utilService } from '../../services/utilService'
import { saveBoard } from '../../store/actions/boardAction'
import { connect } from 'react-redux'
import { ChangeBackground } from './ChangeBackground.jsx'
import { GroupAdd } from '../Group/GroupAdd'

export class _BoardHeader extends Component {

  state = {
    board: {
      title: this.props.board.title,
    },
    isChanging: false,
    isWrapper: false
  }

  toggleMenu = () => {
    const { current } = this.boardMenuVisibility
    if (current.style.opacity === '0') {
      current.style.opacity = '1'
      current.style.visibility = 'visible'
      current.style.width = '27vw'

    }
    else if (current.style.opacity === '1') {
      current.style.opacity = '0'
      current.style.visibility = 'hidden'
      current.style.width = '1vw'
    }
    this.setState({ isChanging: false, isWrapper: !this.state.isWrapper })
  }
  onChangeBackground = () => {
    this.setState({ isChanging: !this.state.isChanging })
  }

  boardMenuVisibility = React.createRef()

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
    const { board, isChanging, isWrapper } = this.state
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
                // return <li key={member._id} className="header-member">
                return <li key={member.fullname} className="header-member">
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
        <div className="board-menu-screen" onClick={ev => ev.stopPropagation()} ref={this.boardMenuVisibility} style={{ opacity: '0', visibility: 'hidden' }}>
          <div className="board-menu-header flex space-around">
            <h3 className="board-menu-title">Menu</h3>
            <h4 className="board-menu-close" onClick={this.toggleMenu}>X</h4>
          </div>
          <hr />
          {!isChanging && <button onClick={this.onChangeBackground}>Change Background</button>}
          {isChanging && <ChangeBackground toggleMenu={this.toggleMenu} onChangeBackground={this.onChangeBackground} />}


        </div>
        {isWrapper && <div className="board-menu-wrapper" onClick={(isWrapper) ? this.toggleMenu : () => { return }}>
        </div>}
        <button className="menu-btn" onClick={this.toggleMenu}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610637597/menu_btis53.png" alt="" /></button>
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