import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/GroupList';
import { BoardHeader } from '../cmps/BoardHeader'
import { loadBoard } from '../store/actions/boardAction'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
export class _BoardApp extends Component {

    // state = {
    //     board: null
    // }

    componentDidMount() {
        this.loadBoard()
        console.log('page is ready')
    }

    loadBoard = async () => {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
        // this.setState({ board })

    }

    // onRemove = (boardId) => {
    //     this.props.removeBoard(boardId)

    // }


    render() {
        const { board } = this.props
        console.log('board', board);
        const load = <p>Loading...</p>
        return (!board.title ? load :
            <section className="board-container">
                <BoardHeader />
                {/* input <input type="text" className="my-input" placeholder="something...." /> */}
                <button className="add-board-btn">+ Add another group</button>
                <DragDropContext>

                    <GroupList groups={board.groups} />

                </DragDropContext>
            </section>
        )
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
    // removeBoard,
    // setFilter,
    // logout,
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
