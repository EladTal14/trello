import React, { Component } from 'react'
import { BoardFilter } from './BoardFilter'
import { utilService } from '../services/utilService'

export class BoardHeader extends Component {


  render() {
    const { title, members } = this.props
    console.log('memebers...', members)
    return (
      <header className="board-header flex space-between">
        <div className="header-options flex">
          <h2>{title}</h2>
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