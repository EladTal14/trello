import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { logout, loadUser } from '../store/actions/userAction.js'
class _AppHeader extends Component {

  render() {
    const { loggedInUser } = this.props
    return (
      <header className="app-header flex space-between">
        <nav>
          <ul className="header-list flex justify-center">
            <li ><Link to="/" className="home-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/home_seebre.png" alt="" /></Link></li>
            <li ><Link to="/boards" className="boards-btn">Boards</Link></li>
          </ul>
        </nav>
        <li ><Link to="/" className="header-title">Trello</Link></li>
        <div className="header-right flex">
          <button className="header-add-board-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" /></button>
          {loggedInUser && <> <div>{loggedInUser.username}</div> <button onClick={this.props.logout}> Logout</button></>}
          <button><Link to="/login">Login</Link></button>
        </div>
      </header>
    )
  }
}

const mapGlobalStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }

}
const mapDispatchToProps = {
  logout,
  loadUser
}

export const AppHeader = connect(mapGlobalStateToProps, mapDispatchToProps)(_AppHeader)
