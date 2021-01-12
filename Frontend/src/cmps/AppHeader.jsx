import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export function AppHeader(props) {
  return (
    <header className="app-header">
      <h1>Tello header</h1>
      <nav>
        <ul className="header-list flex justify-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/boards">Boards</Link></li>
          <li><Link to="/board">Board</Link></li>
          <li><Link to="/board/edit/c104">Edit Todo</Link></li>
        </ul>
      </nav>
    </header>
  )
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
