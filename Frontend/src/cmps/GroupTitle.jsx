import React, { Component } from 'react'
import { loadBoard, saveBoard } from '../store/actions/boardAction'
import { boardService } from '../services/boardService';
import { connect } from 'react-redux'

export class _GroupTitle extends Component {

    state = {
        group: {
            title: this.props.group.title
        }
    }


    // onSaveGroup = (ev) => {
    //     ev.preventDefault()
    //     const group = { title: this.state.group.title, id: utilService.makeId() }
    //     console.log('saving new group...', group)
    //     this.props.onAddGroup(group)
    //     this.setState(
    //         {
    //             group: { title: '' },
    //             isAddOpen: false
    //         })
    // }

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
        this.onSaveTitle()
    }

    onSaveTitle = async () => {
        const groupId = this.props.group.groupId
        const title = this.state.group
        const { board } = this.props
        const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
        const boardCopy = { ...board }
        boardCopy.groups[groupIdx].title = title
        await this.props.saveBoard(boardCopy)
    }


    render() {
        const { group } = this.state
        return <section className="group-title">
                    <input type="text" name="title" value={group.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter group title..." autoComplete="off"/>
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