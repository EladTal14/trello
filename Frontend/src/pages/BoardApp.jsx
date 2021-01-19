import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard, saveBoard, cleanBoard } from '../store/actions/boardAction'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader'
import { GroupList } from '../cmps/Group/GroupList'
import { CardDetails } from '../cmps/Card/CardDetails'
import { boardService } from '../services/boardService'
import { eventBusService } from '../services/eventBusService.js'
import { CardPreviewDetails } from '../cmps/Card/CardPreviewDetails'

export class _BoardApp extends Component {

    state = {
        isDetailsShown: false,
        scrollLeft: 0,
        isPreviewDetailsShown: false,
        userClicked: {
            x: null,
            y: null
        }
    }
    refBoard = React.createRef()
    componentDidMount() {
        this.loadBoard()
        this.eventBusTerminate = eventBusService.on('show-details', this.toggleDetails)
        this.eventBusLabelTerminate = eventBusService.on('label-added', this.onAddLabel)
        this.eventBusRemoveTerminate = eventBusService.on('label-remove', this.onRemoveLabel)
        this.eventBusShowPreviewDetailsTerminate = eventBusService.on('show-preview-details', this.showPreviewCardDetails)
    }
    showPreviewCardDetails = (ev) => {
        console.log(ev);
        this.setState({
            userClicked: { x: ev?.clientX, y: ev?.clientY },
            isPreviewDetailsShown: !this.state.isPreviewDetailsShown
        })
    }
    check = (ev) => { console.log(ev); }

    componentWillUnmount() {
        this.eventBusTerminate()
        this.eventBusLabelTerminate()
        this.eventBusRemoveTerminate()
        this.eventBusShowPreviewDetailsTerminate()
        this.props.cleanBoard()
        // this.props.board = null
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

    onRemoveLabel = async (label) => {
        const { board } = this.props
        const labels = [...board.labels]
        const idx = board.labels.findIndex((currLabel) => currLabel.id === label.id)
        labels.splice(idx, 1)

        board.labels = [...labels]
        await this.props.saveBoard(board)
    }

    onAddLabel = async (label) => {
        const { board } = this.props
        let updatedLabels;
        let isUpdate;

        if (board.labels) {
            isUpdate = board.labels.find((currLabel) => currLabel.id === label.id)
            if (isUpdate) {
                updatedLabels = board.labels.map((currLabel) => currLabel.id === label.id ? label : currLabel)
            } else {
                updatedLabels = [...board.labels, label]
            }
        } else {
            updatedLabels = new Array(label)
        }

        board.labels = [...updatedLabels]
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
    onScroll = (ev, scrolltoleft = 0) => {

        if (!scrolltoleft) return
        const scrollLeft = this.refBoard.current.scrollLeft
        this.setState({
            scrollLeft: scrollLeft
        }, () => {
            if (scrolltoleft)
                this.refBoard.current.scrollLeft = 10000 + scrolltoleft
        })
    }
    render() {
        const { board } = this.props
        console.log('want to check if a new board is add', board);
        if (!board) return <p>Loading...</p>
        // let { isDetailsShown } = this.state
        let { isDetailsShown, isPreviewDetailsShown, userClicked } = this.state
        // console.log('isPreviewDetailsShown', isPreviewDetailsShown);
        // console.log('userClicked', userClicked);
        // if (this.refBoard && this.refBoard.current) {
        //     console.log(this.refBoard.current.clientHeight);
        //     console.log(this.refBoard.current.scrollHeight);
        // }
        return (
            <>
                {this.props.currCard && isDetailsShown &&
                    <>
                        <div className="modal-cover" onClick={() => this.toggleDetails(false)}> </div>
                        <CardDetails card={this.props.currCard} group={this.props.currGroup} toggleDetails={this.toggleDetails} />
                    </>}
                {isPreviewDetailsShown && <CardPreviewDetails board={board} showPreviewCardDetails={this.showPreviewCardDetails} userClicked={userClicked} card={this.props.currCard} group={this.props.currGroup} />}
                <BoardHeader title={board.title} members={board.members} onAddGroup={this.onAddGroup} onScroll={this.onScroll} />
                <section className="board-container" ref={this.refBoard} onScroll={this.onScroll}>
                    <DragDropContext onDragEnd={this.onDragEnd} >
                        <Droppable droppableId="app" type="group" direction="horizontal" >
                            {(provided) => (
                                <div style={{ width: (board.groups.length) * 287 }} ref={provided.innerRef} {...provided.droppableProps}>
                                    <GroupList groups={board.groups} onAddCard={this.onAddCard} onAddGroup={this.onAddGroup} onScroll={this.onScroll} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
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
    cleanBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
