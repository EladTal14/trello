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
import Loader from 'react-loader-spinner'

export class _BoardApp extends Component {
    state = {
        isDetailsShown: false,
        scrollLeft: 0,
        isPreviewDetailsShown: false,
        userClicked: {
            x: null,
            y: null
        },
        isGroupMenuShown: false,
        scrollWidth: 0
    }
    refBoard = React.createRef()

    async componentDidMount() {
        socketService.setup()
        await this.loadBoard()
        // function displayNotification() {
        //     if (Notification.permission === 'granted') {
        //         navigator.serviceWorker.getRegistration().then(function (reg) {
        //             reg.showNotification('Hello world!');
        //         });
        //     }
        // }
        // console.log(navigator.serviceWorker.getRegistration()
        //     .then((reg) => {
        //         console.log(reg);
        //     })
        // );
        // displayNotification()
        socketService.on('load board', board => this.updateBoard(board, true))
        this.eventBusTerminate = eventBusService.on('show-details', this.toggleDetails)
        this.eventBusLabelTerminate = eventBusService.on('label-added', this.onAddLabel)
        this.eventBusRemoveTerminate = eventBusService.on('label-remove', this.onRemoveLabel)
        this.eventBusShowPreviewDetailsTerminate = eventBusService.on('show-preview-details', this.showPreviewCardDetails)
        this.eventBusShowGroupMenuTerminate = eventBusService.on('show-group-menu', this.showGroupMenu)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('prevProps', prevProps);
    //     console.log('prevState', prevState);
    //     console.log('this.refBoard.current.scrollWidth', this.refBoard.current.scrollWidth);
    //     if (prevState.scrollWidth !== this.refBoard.current.scrollWidth) {
    //         this.setState({ scrollWidth: this.refBoard.current.scrollWidth })
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
        socketService.emit('set label', boardId)
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
        // const labels = [...copyBoard.labels]
        const idx = copyBoard.labels.findIndex((currLabel) => currLabel.id === label.id)
        copyBoard.labels.splice(idx, 1)

        // copyBoard.labels = [...labels]
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

    showPreviewCardDetails = (pos) => {
        this.setState({
            userClicked: {
                x: pos?.newClientPos.x,
                y: pos?.newClientPos.y
            },
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
        if (!board) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>
        // let { isDetailsShown, isPreviewDetailsShown, userClicked, isGroupMenuShown, scrollWidth } = this.state
        let { isDetailsShown, isPreviewDetailsShown, userClicked, isGroupMenuShown } = this.state
        // console.log(scrollWidth);

        //socketService.emit('set label', this.props.board._id) // was here
        return (
            < >
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
                                    {/* <div style={{ width: scrollWidth }} ref={provided.innerRef} {...provided.droppableProps}> */}
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
