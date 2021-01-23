import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'
import Input from '@material-ui/core/Input';
import { CSSTransition } from 'react-transition-group'

export class _AddMember extends Component {

    state = {
        mounted: false,
        filterBy: {
            fullname: '',
        }
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    onClose = () => {
        this.setState({ mounted: false })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetUserFilter(this.state.filterBy)
        })
    }

    onToggleUser = (user) => {
        this.props.onUpdateMembers(user)
        // console.log('check', user);
    }

    render() {
        const { users, members } = this.props
        const { filterBy, mounted } = this.state
        return (
            <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleMembers}>
                 <div className="members-container header-members" style={this.props.modalChangePos ? { position: "fixed", top: this.props.modalChangePos.y, left: this.props.modalChangePos.x } : null}>
                    <div className="add-member-header flex spase-between">
                        <h3>Members</h3>
                        <button onClick={this.onClose} className="member-close-btn">✕</button>
                    </div>
                    <Input className="member-filter" type="text" name="fullname" value={filterBy.fullname} onChange={this.handleChange} placeholder="Search members..." />
                    <div className="new-member-list flex column">
                        {users.map(user => <div key={user._id} className="member-items flex space-between" onClick={() => this.onToggleUser(user)}>
                            <div className="flex space-between"><div className="member-item" style={{ backgroundColor: user.color ? user.color : "#3f72af" }}><span>{utilService.convertName(user.fullname)}</span>
                            </div>
                                <p>{user.fullname}</p></div>
                            <button className={(members.findIndex(currUser => currUser._id === user._id) > -1) ?
                                'checked-member' : 'unchecked-member'}>
                                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610900476/checked_etlnj9.png" alt="" />
                            </button>
                        </div>)}
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = state => {
    return {
        // users: state.userModule.users
        //   board: state.boardModule.currBoard,
        // filterBy: state.boardModule.filterBy,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {

}

export const AddMember = connect(mapStateToProps, mapDispatchToProps)(_AddMember);
