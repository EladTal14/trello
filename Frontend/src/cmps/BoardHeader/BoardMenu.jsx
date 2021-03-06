import { Component } from 'react'
import { ChangeBackground } from './ChangeBackground.jsx'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'

class _BoardMenu extends Component {
  render() {
    const { toggleMenu, mainRef, onChangeBackground, isChanging, board } = this.props
    return (
      <div className="board-menu-screen flex justify-center" onClick={ev => ev.stopPropagation()} ref={mainRef} style={{ opacity: '0', visibility: 'hidden', width: 0 }}>

        <section className="menu-container">
          <div className="board-menu-header flex space-around">
            <h3 className="board-menu-title">Menu</h3>
            <h4 className="board-menu-close" onClick={toggleMenu}>✕</h4>
          </div>

          {!isChanging &&
            <>
              <div className="bgc-change flex align-center">
                <button onClick={onChangeBackground}>Change Background</button>
              </div>
              <div className="side-activity-title" >
                <span>
                  <img className="desc-img" src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/left-align_qaakok.png" alt="" />
                </span><p> Activity</p></div>

              <section className="activities-wrapper">
                {board.activities && board.activities.map((activity, idx) => (
                  <div className="activity-comment-wrapper flex" key={idx}>
                    <div className="member" style={{ backgroundImage: `url(${(activity.byMember?.imgUrl) ? activity.byMember?.imgUrl : '#3f72af'})` }}>{!activity.byMember?.imgUrl ? 'G' : ''}</div>

                    <div className="activity-comment">
                      {!activity.toGroup && <p>{activity.byMember ? activity.byMember.fullname : 'Guest'}: {activity.txt}
                        {activity.card?.title} {activity.group?.title}</p>}

                      {activity.toGroup && <p>{activity.byMember ? activity.byMember.fullname : 'Guest'}: {activity.txt}
                       from {activity.group.title} to {activity.toGroup.title}</p>}

                      <TimeAgo className="activity-time" date={activity.createdAt} />
                    </div>
                  </div>))}
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