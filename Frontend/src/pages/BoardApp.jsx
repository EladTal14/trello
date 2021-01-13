import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/GroupList';
import { BoardHeader } from '../cmps/BoardHeader'
import { loadBoard, saveBoard } from '../store/actions/boardAction'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { GroupAdd } from '../cmps/GroupAdd';
import { boardService } from '../services/boardService';
export class _BoardApp extends Component {

    componentDidMount() {
        this.loadBoard()
        console.log('page is ready')
    }

    loadBoard = async () => {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    onAddGroup = async (group) => {
        const { board } = this.props
        board.groups.push(group)
        console.log('saving... new board', board.groups);
        await this.props.saveBoard(board)
        this.loadBoard()
    }

    // onUpdateGroupTitle = () => {

    // }

    onAddCard = async (card, groupId) => {
        const { board } = this.props
        const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
        console.log('index', groupIdx)
        board.groups[groupIdx].cards.push(card)
        console.log('saving... new board', board.groups);
        await this.props.saveBoard(board)
        this.loadBoard()
    }


    render() {
        const { board } = this.props
        console.log('board', board);
        const load = <p>Loading...</p>
        return (!board ? load :
            <section className="board-container">
                <BoardHeader title={board.title}/>
                < GroupAdd onAddGroup={this.onAddGroup}/>
                <DragDropContext>

                    <GroupList groups={board.groups} onAddCard={this.onAddCard}/>

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
    saveBoard,
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
