import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { loadBoard, saveBoard } from '../../store/actions/boardAction'
import { setGroup } from '../../store/actions/cardAction'
import { connect } from 'react-redux'
import { eventBusService } from '../../services/eventBusService.js'
export class _GroupTitle extends Component {

    state = {
        groupIdx: null,
        group: {
            title: ''
        }
    }
    textInput = React.createRef()

    componentDidMount() {
        const groupId = this.props.group.id
        const { board, group } = this.props
        const groupIdx = board.groups.findIndex(group => group.id === groupId)

        this.setState({ groupIdx, group: { title: group.title } })
    }

    componentDidUpdate(prevProps) {

        if (this.props.group.title !== prevProps.group.title) {
            this.setState(prevState => ({
                group: {
                    ...prevState.group,
                    title: this.props.group.title
                }
            }))
        }

    }

    handleInput = ({ target }) => {
        const { name } = target
        const value = target.value
        console.log('target.value', value, name)
        this.setState(prevState => {
            return {
                group: {
                    ...prevState.group,
                    [name]: value
                }
            }
        })
    }

    onSaveTitle = async (ev) => {
        ev.preventDefault()
        const groupId = this.props.group.id
        const board = { ...this.props.board }
        // console.log('board from title', board)
        const { title } = this.state.group
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups[groupIdx].title = title
        await this.props.updateBoard(board)
        this.setState({ groupIdx: null })
    }

    showGroupMenu = (ev, group) => {
        this.props.setGroup(group)
        ev.stopPropagation()
        eventBusService.emit('show-group-menu', ev, true)
    }

    render() {
        const { group } = this.state
        // console.log('GROUP_TITLE:', group.title);
        return <section className="group-title" {...this.props.dragHandle}>
            <form onSubmit={this.onSaveTitle} ref={this.textInput} {...this.props.dragHandle} className="title-form flex space-between">
                {/* <input type="text" ref={this.textInput} name="title" value={group.title} onChange={this.handleInput} */}
                {/* <TextField id="standard-basic" label="Standard" /> */}
                <input type="text" name="title" value={group.title} onChange={this.handleInput}
                    className="title-input" placeholder="Enter group title..." autoComplete="off" onBlur={this.onSaveTitle} />
                <button className="more-options-btn" onClick={(ev) => this.showGroupMenu(ev, group)}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/more_e8mezf.png" alt="" /></button>
            </form>
        </section>
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
    setGroup
}



export const GroupTitle = connect(mapStateToProps, mapDispatchToProps)(_GroupTitle);