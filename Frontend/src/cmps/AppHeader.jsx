import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { logout, loadUser } from '../store/actions/userAction.js'
import { saveBoard } from '../store/actions/boardAction'
import { utilService } from '../services/utilService.js'
import { AddBoard } from './BoardHeader/AddBoard.jsx'
import { withRouter } from "react-router";

class _AppHeader extends Component {

  state = {
    loggedInUser: null,
    isAddBoardShow: false,
  }

  async componentDidMount() {
    const user = await this.props.loadUser()
    if (user) this.setState({ loggedInUser: user })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedInUser !== this.state.loggedInUser)
      this.setState({ loggedInUser: this.props.loggedInUser })
  }

  toggleAddBoard = () => {
    this.setState({ isAddBoardShow: !this.state.isAddBoardShow })
  }

  addBoard = async (board) => {
    await this.props.saveBoard(board, true)
    const newBoardId = this.props.board._id
    console.log('newBoardId', newBoardId)
    this.props.history.push(`/`)
    this.props.history.push(`board/${newBoardId}`)
  }

  render() {
    const { loggedInUser, isAddBoardShow } = this.state
    return (
      <>
        {isAddBoardShow && <AddBoard addBoard={this.addBoard} toggleAddBoard={this.toggleAddBoard} />}
        <header className="app-header flex space-between">
          <nav>
            <ul className="header-list flex justify-center">
              <li ><Link to="/" className="home-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/home_seebre.png" alt="" /></Link></li>
              <li ><Link to="/boards" className="boards-btn">Boards</Link></li>
            </ul>
          </nav>
          <li ><Link to="/" className="header-title"><img src="https://res.cloudinary.com/basimgs/image/upload/v1611315507/multitask_1_fjrnbt.png" alt="" /><h2>TasKooler</h2></Link></li>
          <div className="header-right flex">
            <button className="header-add-board-btn" onClick={this.toggleAddBoard}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" /></button>
            {loggedInUser && <> <div className="header-user-logged-in" style={{ backgroundImage: `url(${(loggedInUser.imgUrl) ? loggedInUser.imgUrl : '#3f72af'})` }}></div> <button className="header-log-board-btn" onClick={this.props.logout}> Logout</button></>}
            {!loggedInUser && <>  <div className="header-user-logged-in">{'G '} </div> <button className="header-log-board-btn"><Link to="/login">Login</Link></button></>}
          </div>
        </header>
      </>
    )
  }
}

const mapGlobalStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
    board: state.boardModule.currBoard
  }
}
const mapDispatchToProps = {
  logout,
  loadUser,
  saveBoard,
}

export const AppHeader = connect(mapGlobalStateToProps, mapDispatchToProps)(withRouter(_AppHeader))
