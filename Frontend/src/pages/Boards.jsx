import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardPreview } from '../cmps/BoardPreview'
import { loadBoards, saveBoard } from '../store/actions/boardAction'

export class _Boards extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.boards === prevProps.boards && this.props.board) {
    //         this.props.loadBoards()
    //         console.log('this.props UPDATE', this.props)
    //         // this.props.history.push(`board/${this.props.board._id}`)
    //     }
    // }

    addBoard = async () => {
        const board = { title: 'New Board', style: {} }
        await this.props.saveBoard(board)
        console.log('board to add new', this.props.board);
        this.props.history.push(`board/${this.props.board._id}`)
    }
    // const board = { title: 'New Board' }
    // await this.props.saveBoard(board, true)
    // console.log('this.props', this.props.board._id)
    // addBoard = async () => {
    //     const board = { title: 'New Board' }
    //     await this.props.saveBoard(board)
    //     console.log('board', board)
    //     this.props.history.push(`board/${this.props.board._id}`)
    // }

    render() {
        const { boards } = this.props
        const load = <p>Loading...</p>
        if (!boards) return load
        // console.log('this.props UPDATE', this.props)
        return (
            <div className="boards-page">
                <h2>Our Boards</h2>
                <section className="boards-container">
                    <div className="new-board" onClick={this.addBoard}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" /></div>
                    {boards.map(board => {
                        return <BoardPreview key={board._id} board={board} />
                    })}
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards,
        board: state.boardModule.currBoard,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoards,
    saveBoard,
    // removeBoard,
}



export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards);