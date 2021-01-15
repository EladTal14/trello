import React, { Component } from 'react'
// var moment = require('moment');
// TODO: moment.from()

export class CardActivityContainer extends Component {

  state = {
    comments: null,
    newComment: '',
    isSaveOpen: false
  }

  componentDidMount() {
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

  render() {
    const { newComment, isSaveOpen, comments } = this.state
    return (
      <div className="activity-container">
        <div className="activity-header">
          <span>L </span>
          <span>Activity</span>
        </div>
        <div className="flex column">
          <div className="flex">
            <div className="member">BK</div>
            <textarea
              className="activity-textarea"
              type="text"
              name="txt"
              value={newComment}
              onChange={this.onHandleCommentChange}
              placeholder="Write a comment..."
            />
          </div>
          {isSaveOpen && <button onMouseDown={this.saveNewTodo} >Save</button>}
        </div>
        {comments && comments.map((comment) => {
          return <div className="activity-comment-wrapper flex">
            <div className="member">UM</div>
            <div className="activity-comment">
              <p>{comment.txt}</p>
              <span>Time </span>
            </div>
          </div>
        })}
      </div>
    )
  }
}
