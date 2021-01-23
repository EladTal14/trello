import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardPreview } from '../cmps/BoardPreview'
import { loadBoards, saveBoard } from '../store/actions/boardAction'
import Loader from 'react-loader-spinner'
import { AddBoard } from '../cmps/BoardHeader/AddBoard'

export class _Boards extends Component {

    state = {
        isAddBoardShown: false
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    toggleAddBoard = () => {
        this.setState({ isAddBoardShown: !this.state.isAddBoardShown })
    }

    addBoard = async (board) => {
        await this.props.saveBoard(board, true)
        const newBoardId = this.props.board._id
        console.log('newBoardId', newBoardId)
        this.props.history.push(`board/${newBoardId}`)
    }

    render() {
        const { boards } = this.props
        if (!boards) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>
        const { isAddBoardShown } = this.state
        // console.log('this.props UPDATE', this.props)
        return (
            <>
                {isAddBoardShown && <AddBoard addBoard={this.addBoard} toggleAddBoard={this.toggleAddBoard} />}
                <div className="boards-page">
                    <h2>Our Boards</h2>
                    <section className="boards-container">
                        <div className="new-board" onClick={this.toggleAddBoard}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" /></div>
                        {boards.map(board => {
                            return <BoardPreview key={board._id} board={board} />
                        })}
                    </section>
                </div>
            </>
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