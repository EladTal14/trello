import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction'
import { CSSTransition } from 'react-transition-group'
import { utilService } from '../../services/utilService'

class _GroupMenu extends Component {
    state = {
        group: null,
        userClicked: null,
        mounted: false,
    }

    componentDidMount() {
        // this.setState({ card: this.props.card }, () => console.log(this.state.card))
        this.setState({ group: this.props.group, userClicked: this.props?.userClicked, mounted: true })
    }

    componentWillUnmount() {
        this.setState({
            group: null,
            userClicked: null,
        })
    }


    onClose = () => {
        this.setState({ mounted: false })
    }


    onRemoveGroup = () => {
        const copyBoard = { ...this.props.board }
        const { group } = this.state
        const groupIdx = copyBoard.groups.findIndex((currGroup) => currGroup.id === group.id)
        copyBoard.groups.splice(groupIdx, 1)
        this.props.saveBoard(copyBoard)
        this.onClose()
    }

    onAddCard = () => {
        console.log('not working yet');
    }

    onCopyGroup = async () => {
        const copyBoard = {...this.props.board}
        const { group } = this.state
        const groupIdx = copyBoard.groups.findIndex((currGroup) => currGroup.id === group.id)
        const copyGroup = {...group, id: utilService.makeId()}
        copyBoard.groups.splice(groupIdx, 0, copyGroup)
        await this.props.saveBoard(copyBoard)
        this.onClose()
    }


    render() {
        const { userClicked, group, mounted } = this.state
        if (!group) return <div>Loading...</div>
        return (
            <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.showGroupMenu}>
            <div className="group-menu flex column" style={{
                position: 'absolute',
                zIndex: 1000, top: userClicked?.y + 10, left: userClicked?.x - 150
            }}>
                <div className="group-actions flex spase-between">
                    <h3>List Actions</h3>
                    <button onClick={this.onClose} className="group-close-btn">✕</button>
                </div>
                <div className="group-menu-btns flex column">
                    <button className="group-menu-btn" onClick={this.onAddCard}>
                    Add Card...</button>
                    <button className="group-menu-btn" onClick={this.onCopyGroup}>
                    Copy List...</button>
                    <button className="group-menu-btn" onClick={this.onRemoveGroup}>
                    Delete List...</button>
                    <button className="group-menu-btn">
                    Watch...</button>
                    <hr/>
                    <button className="group-menu-btn">
                    Sort By...</button>
                    <hr/>
                    <button className="group-menu-btn">
                    Move All Cards In This List...</button>
                    <button className="group-menu-btn">
                    Archive All Cards in this List...</button>

                </div>
            </div>
            </CSSTransition>
        )
    }
}


const mapStateToProps = (state) => ({
    board: state.boardModule.currBoard,
})

const mapDispatchToProps = {
    saveBoard
}

export const GroupMenu = connect(mapStateToProps, mapDispatchToProps)(_GroupMenu)
