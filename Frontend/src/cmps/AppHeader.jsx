import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { logout, loadUser } from '../store/actions/userAction.js'
class _AppHeader extends Component {

  state = {
    loggedInUser: null,
    isAddBoardShow: false,
  }

  toggleAddBoard = () => {
    this.setState({ isAddBoardShow: !this.state.isAddBoardShow })
  }

  async componentDidMount() {
    console.log(this.props);
    const user = await this.props.loadUser()
    if (user) this.setState({ loggedInUser: user })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.log('state', this.state);
    if (prevProps.loggedInUser !== this.state.loggedInUser)
      this.setState({ loggedInUser: prevProps.loggedInUser })
  }
  render() {
    window.loggedInUser = this.state
    const { loggedInUser } = this.state
    // if (!loggedInUser) return <div>Loading...</div>
    console.log('LOGGED IN USER', loggedInUser);
    return (
      <>
      {/* {isAddBoardShow && <div className="mini-add-"></div> } */}
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
      </>
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
