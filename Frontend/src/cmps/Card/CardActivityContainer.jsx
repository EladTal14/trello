import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../../services/utilService'
import TimeAgo from 'react-timeago'
import { socketService } from '../../services/socketService'

class _CardActivityContainer extends Component {

  state = {
    comments: null,
    isSaveOpen: false,
    newComment: ''
  }

  componentDidMount() {
    // socketService.setup()

    // socketService.on('commented', (cmt) => {
    //   console.log('cmt', cmt)
    // }) 

    const { comments } = this.props.card
    this.setState({ comments })
  }

  onHandleCommentChange = ({ target }) => {
    const { value } = target
    if (value) this.onToggleIsSaveOpen(true)
    else this.onToggleIsSaveOpen(false)

    this.setState(prevState => {
      return {
        ...prevState,
        newComment: value
      }
    })
  }

  onToggleIsSaveOpen = (isOpen) => {
    this.setState(prevState => {
      return {
        ...prevState,
        isSaveOpen: isOpen
      }
    })
  }

  createComment = () => {
    const { newComment } = this.state
    const loggedInUser = this.props.loggedInUser
    let byMember = null;

    if (loggedInUser) {
      byMember = {
        _id: loggedInUser._id,
        fullname: loggedInUser.fullname,
        imgUrl: loggedInUser.imgUrl,
        color: loggedInUser.color

      }
    }

    return {
      id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
      byMember
    }
  }

  onSaveNewComment = () => {

    const comment = this.createComment()
    let commentsCopy = this.state.comments
    if (commentsCopy) commentsCopy.unshift(comment)
    else commentsCopy = new Array(comment)

    this.setState(prevState => {
      return {
        ...prevState,
        comments: commentsCopy
      }
    }, () => {
      this.props.onHandleActivitiesChange(this.state.comments)
      this.setState(prevState => {
        return {
          ...prevState,
          newComment: '',
          isSaveOpen: false
        }
      })
    })
  }

  render() {
    const { newComment, isSaveOpen, comments } = this.state
    const loggedInUser = this.props.loggedInUser
    return (
      <div className="activity-container">
        <div className="activity-header flex">
          <img src="https://res.cloudinary.com/basimgs/image/upload/v1611394931/list_fd3uv1.png" alt="" />
          <h3>Activity</h3>
        </div>
        <div className="flex column">
          <div className="flex">

            <div className="member" style={{ backgroundImage: `url(${(loggedInUser?.imgUrl) ? loggedInUser?.imgUrl : '#3f72af'})` }}>{!loggedInUser?.imgUrl ? 'G' : ''}</div>

            <textarea
              className="activity-textarea"
              type="text"
              name="txt"
              value={newComment}
              onChange={this.onHandleCommentChange}
              placeholder="Write a comment..."
            />
          </div>
          {isSaveOpen && <button className="save-btn" onMouseDown={this.onSaveNewComment} >Save</button>}
        </div>
        {comments && comments.map((comment, index) => {
          return <div key={index} className="activity-comment-wrapper flex">
            <div className="member" style={{ backgroundImage: `url(${(comment.byMember?.imgUrl) ? comment.byMember?.imgUrl : '#3f72af'})` }}>{!comment.byMember?.imgUrl ? 'G' : ''}</div>
            <div className="activity-comment">
              <p>{comment.byMember ? comment.byMember.fullname : 'Guest'}: {comment.txt}</p>
              <TimeAgo className="activity-time" date={comment.createdAt} />
            </div>
          </div>
        })}
      </div>
    )
  }
}

// TODO: loggedInUser
const mapStateToProps = state => {
  return {
    board: state.boardModule.currBoard,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
}

export const CardActivityContainer = connect(mapStateToProps, mapDispatchToProps)(_CardActivityContainer)