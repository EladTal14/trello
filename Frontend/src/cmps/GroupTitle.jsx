import React, { Component } from 'react'
import { loadBoard, saveBoard } from '../store/actions/boardAction'
import { boardService } from '../services/boardService';
import { connect } from 'react-redux'

export class _GroupTitle extends Component {

    state = {
        groupIdx: null,
        group: {
            title: this.props.group.title,

        }
    }

    componentDidMount() {
        const groupId = this.props.group.id
        const { board } = this.props
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        this.setState({ groupIdx })
    }

    handleInput = ({ target }) => {
        const { name } = target
        const value = target.value
        this.setState(prevState => {
            return {
                group: {
                    ...prevState.group,
                    [name]: value
                }
            }
        })
    }

    onSaveTitle = async (ev) => {
        ev.preventDefault()
        const { board } = this.props
        const { title } = this.state.group
        const boardCopy = { ...board }
        boardCopy.groups[this.state.groupIdx].title = title
        await this.props.saveBoard(boardCopy)
    }


    render() {
        const { group } = this.state
        return <section className="group-title">
            <form onBlur={this.onSaveTitle} className="title-form flex space-between">
                <input type="text" name="title" value={group.title} onChange={this.handleInput}
                    className="title-input" placeholder="Enter group title..." autoComplete="off" />
                    <button className="more-options-btn" ><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/more_e8mezf.png" alt="" /></button>
            </form>
        </section>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        // filterBy: state.boardModule.filterBy,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    saveBoard,
}



export const GroupTitle = connect(mapStateToProps, mapDispatchToProps)(_GroupTitle);