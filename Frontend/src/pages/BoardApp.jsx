import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard, saveBoard, cleanBoard } from '../store/actions/boardAction'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { BoardHeader } from '../cmps/BoardHeader/BoardHeader'
import { GroupList } from '../cmps/Group/GroupList'
import { GroupMenu } from '../cmps/Group/GroupMenu'
import { CardDetails } from '../cmps/Card/CardDetails'
import { boardService } from '../services/boardService'
import { eventBusService } from '../services/eventBusService.js'
import { CardPreviewDetails } from '../cmps/Card/CardPreviewDetails'
import { socketService } from '../services/socketService'
import { activityService } from '../services/activityService'

export class _BoardApp extends Component {
    state = {
        isDetailsShown: false,
        scrollLeft: 0,
        isPreviewDetailsShown: false,
        userClicked: {
            x: null,
            y: null
        },
        isGroupMenuShown: false
    }
    refBoard = React.createRef()
    componentDidMount() {
        socketService.setup()
        this.loadBoard()
        socketService.on('load board', (board) => this.updateBoard(board, true))

        this.eventBusTerminate = eventBusService.on('show-details', this.toggleDetails)
        this.eventBusLabelTerminate = eventBusService.on('label-added', this.onAddLabel)
        this.eventBusRemoveTerminate = eventBusService.on('label-remove', this.onRemoveLabel)
        this.eventBusShowPreviewDetailsTerminate = eventBusService.on('show-preview-details', this.showPreviewCardDetails)
        this.eventBusShowGroupMenuTerminate = eventBusService.on('show-group-menu', this.showGroupMenu)
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.board === prevProps.board) {
    //     // if (this.props.board !== prevProps.board && !this.props.board) {
    //         this.props.loadBoards()
    //         // this.props.history.push(`board/${this.props.board._id}`)
    //     }
    // }

    componentWillUnmount() {
        this.eventBusTerminate()
        this.eventBusLabelTerminate()
        this.eventBusRemoveTerminate()
        this.eventBusShowPreviewDetailsTerminate()
        socketService.terminate()
        this.props.cleanBoard()
        this.eventBusShowGroupMenuTerminate()
        // this.props.board = null
    }

    updateBoard = (board, isRenderSocket = false) => {
        this.props.saveBoard(board, isRenderSocket)
    }

    loadBoard = async () => {
        const { boardId } = this.props.match.params
        await this.props.loadBoard(boardId)
    }

    onAddGroup = async (group) => {
        const { board } = this.props
        const copyBoard = { ...board }
        copyBoard.groups.push(group)
        await this.props.saveBoard(copyBoard)

        // socketService.emit('group added', board)
    }

    onRemoveLabel = async (label) => {
        const { board } = this.props
        const copyBoard = { ...board }
        const labels = [...board.labels]
        const idx = copyBoard.labels.findIndex((currLabel) => currLabel.id === label.id)
        labels.splice(idx, 1)

        copyBoard.labels = [...labels]
        await this.props.saveBoard(copyBoard)
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

    onDragCard = async (sourceGroup = null, destinationGroup = null) => {
        const { board } = this.props
        const copyBoard = { ...board }

        if (sourceGroup && destinationGroup) {
            if (sourceGroup.title !== destinationGroup.title) {
                var activity = activityService.createActivity(this.props.loggedInUser, 'moved card ', null, sourceGroup, ' to', destinationGroup)
                copyBoard.activities ? copyBoard.activities.unshift(activity) : copyBoard.activities = new Array(activity)
            }
        }

        await this.props.saveBoard(copyBoard)
        // socketService.emit('card dragged', board) 
    }

    onAddCard = async (card, groupId) => {
        const { board } = this.props
        const copyBoard = { ...board }

        const groupIdx = await boardService.getGroupIdxById(board._id, groupId)
        copyBoard.groups[groupIdx].cards.push(card)

        const activity = activityService.createActivity(this.props.loggedInUser, 'added card ', card, copyBoard.groups[groupIdx], 'to')
        copyBoard.activities ? copyBoard.activities.unshift(activity) : copyBoard.activities = new Array(activity)

        await this.props.saveBoard(copyBoard)

        // socketService.emit('card added', board)
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
        this.onDragCard(sourceGroup, destinationGroup)
    }

    toggleDetails = () => {
        this.setState({ isDetailsShown: !this.state.isDetailsShown })
    }
    onScroll = (ev, scrolltoleft = 0) => {

        if (!scrolltoleft) return
        const scrollLeft = this.refBoard.current.scrollLeft
        this.setState({
            scrollLeft: scrollLeft
        }, () => {
            if (scrolltoleft)
                this.refBoard.current.scrollLeft += scrolltoleft
        })
    }
    showPreviewCardDetails = (ev) => {
        console.log(ev);
        this.setState({
            userClicked: { x: ev?.clientX, y: ev?.clientY },
            isPreviewDetailsShown: !this.state.isPreviewDetailsShown
        })
    }

    showGroupMenu = (ev) => {
        // console.log(ev);
        this.setState({
            userClicked: { x: ev?.clientX, y: ev?.clientY },
            isGroupMenuShown: !this.state.isGroupMenuShown
        })
    }


    render() {
        const { board } = this.props
        console.log('want to check if a new board is add', board);
        if (!board) return <p>Loading...</p>
        // console.log('board', board._id)
        let { isDetailsShown, isPreviewDetailsShown, userClicked, isGroupMenuShown } = this.state
        console.log('this.props.board', this.props.board)
        socketService.emit('set label', this.props.board._id)
        return (
            <>
                {this.props.currCard && isDetailsShown &&
                    <>
                        {/* <div className="modal-cover" onClick={this.toggleDetails}> </div> */}
                        <CardDetails card={this.props.currCard} group={this.props.currGroup} toggleDetails={this.toggleDetails} />
                    </>}
                
                {isGroupMenuShown && <GroupMenu board={board} showGroupMenu={this.showGroupMenu} userClicked={userClicked} group={this.props.currGroup} />}
                {isPreviewDetailsShown && <CardPreviewDetails board={board} showPreviewCardDetails={this.showPreviewCardDetails} userClicked={userClicked} card={this.props.currCard} group={this.props.currGroup} />}
                <BoardHeader title={board.title} members={board.members} onAddGroup={this.onAddGroup} />
                <section className="board-container" ref={this.refBoard} onScroll={this.onScroll}>
                    <DragDropContext onDragEnd={this.onDragEnd} >
                        <Droppable droppableId="app" type="group" direction="horizontal" >
                            {(provided) => (
                                <div style={{ width: (board.groups.length) * 287 }} ref={provided.innerRef} {...provided.droppableProps}>
                                    <GroupList updateBoard={this.updateBoard} groups={board.groups} onAddCard={this.onAddCard} onAddGroup={this.onAddGroup} onScroll={this.onScroll} />
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
        currGroup: state.cardModule.currGroup,
        loggedInUser: state.userModule.loggedInUser
        // filterBy: state.boardModule.filterBy,
    }
}

const mapDispatchToProps = {
    loadBoard,
    saveBoard,
    cleanBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
