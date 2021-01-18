import { Component } from 'react'
import { ChangeBackground } from './ChangeBackground.jsx'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'
import { utilService } from '../../services/utilService.js'

class _BoardMenu extends Component {
  render() {
    const { toggleMenu, mainRef, onChangeBackground, isChanging, board } = this.props
    return (
      <div className="board-menu-screen flex justify-center" onClick={ev => ev.stopPropagation()} ref={mainRef} style={{ opacity: '0', visibility: 'hidden' }}>

        <section className="menu-container">
          <div className="board-menu-header flex space-around">
            <h3 className="board-menu-title">Menu</h3>
            <h4 className="board-menu-close" onClick={toggleMenu}>X</h4>
          </div>

          {!isChanging &&
            <>
              <div className="bgc-change flex align-center">
                <button onClick={onChangeBackground}>Change Background</button>
              </div>
              <div className="side-activity-title" ><span>L </span> Activity</div>

              <section className="activities-wrapper">
                {board.activities && board.activities.map((activity, idx) => (
                  <div className="activity-comment-wrapper flex" key={idx}>
                    <div className="member">{activity.byMember ? utilService.convertName(activity.byMember.fullname) : 'G'}</div>

                    <div className="activity-comment">
                      <p>{activity.byMember ? activity.byMember.fullname : 'Guest'}: {activity.txt}</p>
                      <TimeAgo className="activity-time" date={activity.createdAt} />
                    </div>
                  </div>
                ))}
              </section>
            </>
          }
          {isChanging && <ChangeBackground toggleMenu={toggleMenu} onChangeBackground={onChangeBackground} />}
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard
  }
}

const mapDispatchToProps = {
  // saveBoard,
  // loadUsers,
}



export const BoardMenu = connect(mapStateToProps, mapDispatchToProps)(_BoardMenu);