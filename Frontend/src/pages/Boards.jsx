import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardPreview } from '../cmps/BoardPreview'
import { loadBoards } from '../store/actions/boardAction'

export class _Boards extends Component {


    componentDidMount() {
        this.props.loadBoards()
    }

    // onRemove = (boardId) => {
    //     this.props.removeBoard(boardId)

    // }


    render() {
        const { boards } = this.props
        console.log('boards', boards);
        const load = <p>Loading...</p>
        return (!boards ? load :
            <section className="boards-container">
                {boards.map(board => {
                    return <BoardPreview key={board._id} board={board} />
                })}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoards,
    // removeBoard,
}



export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards);