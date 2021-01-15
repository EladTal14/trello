import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollContainer from 'react-indiana-drag-scroll'
import { loadBoard, saveBoard } from '../store/actions/boardAction'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader'
import { GroupList } from '../cmps/Group/GroupList'
import { GroupAdd } from '../cmps/Group/GroupAdd'
import { CardDetails } from '../cmps/Card/CardDetails'
import { boardService } from '../services/boardService'
import { eventBusService } from '../services/eventBusService.js'

export class _BoardApp extends Component {

    state = {
        isDetailsShown: false
    }

    componentDidMount() {
        this.loadBoard()
        this.eventBusTerminate = eventBusService.on('show-details', this.toggleDetails)
    }

    componentWillUnmount() {
        this.eventBusTerminate()
    }

    loadBoard = async () => {
        const { boardId } = this.props.match.params
        await this.props.loadBoard(boardId)
    }

    onAddGroup = async (group) => {
        const { board } = this.props
        board.groups.push(group)
        await this.props.saveBoard(board)
    }

    onDragCard = async () => {
        const { board } = this.props
        await this.props.saveBoard(board)
    }

    onAddCard = async (card, groupId) => {
        const { board } = this.props
        const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
        board.groups[groupIdx].cards.push(card)
        await this.props.saveBoard(board)
    }

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result
        const { groups } = this.props.board
        if (!destination) return
        if (type === 'group') {
            const dragGroup = groups.find(group => group.id === draggableId)
            groups.splice(source.index, 1)
            groups.splice(destination.index, 0, dragGroup)
            this.onDragCard()
            return
        }
        const sourceGroup = groups.find(group => group.id === source.droppableId)
        const destinationGroup = groups.find(group => group.id === destination.droppableId)
        const draggingCard = sourceGroup.cards.find(card => card.id === draggableId)
        sourceGroup.cards.splice(source.index, 1)
        destinationGroup.cards.splice(destination.index, 0, draggingCard)
        this.onDragCard()
    }

    toggleDetails = (isShown) => {
        this.setState({ isDetailsShown: isShown })
    }

    render() {
        const { board } = this.props
        console.log('want to check if a new board is add', board);
        let { isDetailsShown } = this.state
        if (!board) return <p>Loading...</p>
        return (
            <>
                {this.props.currCard && isDetailsShown &&
                    <>
                        <div className="modal-cover" onClick={() => this.toggleDetails(false)}> </div>
                        <CardDetails card={this.props.currCard} group={this.props.currGroup} />
                    </>}

                <BoardHeader title={board.title} members={board.members} />
                <GroupAdd onAddGroup={this.onAddGroup} />
                <section className="board-container">
                    <ScrollContainer ignoreElements="article" >
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="app" type="group" direction="horizontal">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <GroupList groups={board.groups} onAddCard={this.onAddCard} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </ScrollContainer>
                </section>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCard: state.cardModule.currCard,
        currGroup: state.cardModule.currGroup
        // filterBy: state.boardModule.filterBy,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    saveBoard,
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
