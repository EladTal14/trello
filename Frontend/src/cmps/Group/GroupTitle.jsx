import React, { Component } from 'react'
import { loadBoard, saveBoard } from '../../store/actions/boardAction'
import { setGroup } from '../../store/actions/cardAction'
import { connect } from 'react-redux'
import { eventBusService } from '../../services/eventBusService.js'
export class _GroupTitle extends Component {

    state = {
        groupIdx: null,
        group: {
            title: ''
        },
        isTitleShown: false
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
        const { title } = this.state.group
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        board.groups[groupIdx].title = title
        await this.props.updateBoard(board)
        this.setState({ groupIdx: null, isTitleShown: false })
    }

    showGroupMenu = (ev) => {
        const { group } = this.props
        this.props.setGroup(group)
        ev.stopPropagation()
        eventBusService.emit('show-group-menu', ev, true)
    }

    showInput = () => {
        this.setState(prevState => ({
            ...prevState,
            isTitleShown: true
        }))
    }

    render() {
        const { group, isTitleShown } = this.state
        return <section className="group-title" {...this.props.dragHandle}>
            <form onSubmit={this.onSaveTitle} ref={this.textInput} {...this.props.dragHandle} className="title-form flex space-between">
                {!isTitleShown && <h3 style={{ width: '100%' }} className="title-input title" onClick={this.showInput}>{group.title}</h3>}
                {isTitleShown && <input type="text" name="title" style={{
                    width: '90%', fontFamily: "montserrat", fontWeight: 600,
                    fontSize: "1rem", paddingTop: 10, paddingBottom: 10
                }} autoFocus value={group.title} onChange={this.handleInput}
                    className="title-input" placeholder="Enter List title..." autoComplete="off" onBlur={this.onSaveTitle} />}
                <button className="more-options-btn" onClick={(ev) => this.showGroupMenu(ev)}><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/more_e8mezf.png" alt="" /></button>
            </form>
        </section>
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
    }
}

const mapDispatchToProps = {
    loadBoard,
    saveBoard,
    setGroup
}



export const GroupTitle = connect(mapStateToProps, mapDispatchToProps)(_GroupTitle);