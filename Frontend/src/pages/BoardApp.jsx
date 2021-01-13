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
        await this.props.loadBoard(boardId)
        // console.log('BOARD CUURR', this.props.board);
    }

    onAddGroup = async (group) => {
        const { board } = this.props
        const boardCopy = { ...board }
        boardCopy.groups.push(group)
        await this.props.saveBoard(boardCopy)
        this.loadBoard()
        // console.log('saving... new board', board.groups);
    }
    onDragCard = async (groups) => {
        const { board } = this.props
        board.groups = [...groups]
        await this.props.saveBoard(board)
        this.loadBoard()
    }

    
    // onDragCard = async (dragbbleGroups) => {
    //     const { board } = this.props
    //     const updatedGroups = boardService.getUpdatedGroups(board.groups, dragbbleGroups)
    //     // console.log('updated board!!!!', updatedGroups)
    //     board.groups = updatedGroups
    //     await this.props.saveBoard(board)
    //     this.loadBoard()
    // }


    // onUpdateGroupTitle = () => {

    // }
    // 

    onAddCard = async (card, groupId) => {
        const { board } = this.props
        const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
        // console.log('index', groupIdx)
        board.groups[groupIdx].cards.push(card)
        // console.log('saving... new board', board.groups);
        await this.props.saveBoard(board)
        this.loadBoard()
    }


    render() {
        const { board } = this.props
        console.log('board', board);
        const load = <p>Loading...</p>
        return (!board ? load :
            <section className="board-container">
                <BoardHeader title={board.title} />
                < GroupAdd onAddGroup={this.onAddGroup} />
                <DragDropContext>
                    <GroupList groups={board.groups} onAddCard={this.onAddCard} onDragCard={this.onDragCard} />
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
