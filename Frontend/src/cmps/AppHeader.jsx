import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { logout, loadUser } from '../store/actions/userAction.js'
class _AppHeader extends Component {
  state = {
    loggedInUser: null
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
      <header className="app-header flex space-between">
        <h1>Tello header</h1>
        <nav>
          <ul className="header-list flex justify-center">
            {loggedInUser && <> <div>{loggedInUser.username}</div> <button onClick={this.props.logout}> Logout</button></>}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/boards">Boards</Link></li>
            <li><Link to="/board">Board</Link></li>
          </ul>
        </nav>
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
