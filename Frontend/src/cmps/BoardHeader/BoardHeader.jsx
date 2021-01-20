import React, { Component } from 'react'
import { utilService } from '../../services/utilService'
import { saveBoard } from '../../store/actions/boardAction'
import { loadUsers } from '../../store/actions/userAction'
import { connect } from 'react-redux'
// import { ChangeBackground } from './ChangeBackground.jsx'
// import { GroupAdd } from '../Group/GroupAdd'
import { socketService } from '../../services/socketService.js'
import { AddMember } from '../AddMember'
import { BoardMenu } from './BoardMenu'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export class _BoardHeader extends Component {

  state = {
    board: {
      title: this.props.board.title,
    },
    isChanging: false,
    isWrapper: false,
    isMoreMembersShown: false
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  toggleMenu = () => {
    const { current } = this.boardMenuVisibility
    if (current.style.opacity === '0') {
      current.style.opacity = '1'
      current.style.visibility = 'visible'
      current.style.width = '290px'

    } else if (current.style.opacity === '1') {
      current.style.opacity = '0'
      current.style.visibility = 'hidden'
      current.style.width = '0'
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

  toggleMembers = () => {
    this.setState({ isMoreMembersShown: !this.state.isMoreMembersShown })
  }

  onUpdateMembers = async (member) => {
    const { board } = this.props
    const memberIdx = board.members.findIndex(currMember => currMember._id === member._id)
    if (memberIdx > -1) {
      board.members.splice(memberIdx, 1)
    } else {
      board.members.push(member)
    }
    await this.props.saveBoard(board)
  }

  onSetUserFilter = (filterBy) => {
    console.log('filtermember by', filterBy)
    // this.props.setUserFilter(filterBy)
    // this.props.loadUsers(filterBy)

  }


  render() {
    const { members, users } = this.props
    const { board, isChanging, isWrapper, isMoreMembersShown } = this.state
    return (
      <>
        {isMoreMembersShown && <div className="board-header-member-box"><AddMember toggleMembers={this.toggleMembers} onUpdateMembers={this.onUpdateMembers}
          onSetUserFilter={this.onSetUserFilter} members={members} users={users} /></div>}
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
                <TransitionGroup className="members-list flex">
                  {members.map((member, idx) =>
                    <CSSTransition key={idx} timeout={500} classNames="item">
                      <li key={member.fullname} className="header-member">
                        {utilService.convertName(member.fullname)}
                      </li>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </ul>
              <button className="add-member" onClick={this.toggleMembers}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625640/add-user_qxgidw.png" alt="" />
              </button>
            </div>
          </div>
          {/* <BoardFilter /> */}
          <BoardMenu
            toggleMenu={this.toggleMenu}
            mainRef={this.boardMenuVisibility}
            onChangeBackground={this.onChangeBackground}
            isChanging={isChanging}
          />


          {isWrapper && <div className="board-menu-wrapper" onClick={(isWrapper) ? this.toggleMenu : () => { return }}>
          </div>}
          <button className="menu-btn" onClick={this.toggleMenu}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610637597/menu_btis53.png" alt="" /></button>
        </header>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard,
    users: state.userModule.users
    // filterBy: state.boardModule.filterBy,
    // loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  saveBoard,
  loadUsers,
}



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);