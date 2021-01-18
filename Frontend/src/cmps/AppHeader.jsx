import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export function AppHeader(props) {
  return (
    <header className="app-header flex space-between">
      <nav>
        <ul className="header-list flex justify-center">
          <li ><Link to="/" className="home-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/home_seebre.png" alt=""/></Link></li>
          <li ><Link to="/boards" className="boards-btn">Boards</Link></li>
        </ul>
      </nav>
      <li ><Link to="/" className="header-title">Trello</Link></li>
      <div className="header-right">
        <button className="header-add-board-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt=""/></button>
      </div>
    </header>
  )
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
