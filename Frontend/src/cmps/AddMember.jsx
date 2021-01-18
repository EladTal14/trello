import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'

export class _AddMember extends Component {

    onToggleUser = (user) => {
        this.props.onUpdateMembers(user)
        console.log('check', user);
    }

    render() {
        const { users, members } = this.props
        console.log('current members', members);
        // const {usersToAdd } = this.state
        // console.log('usersToAdd', usersToAdd);
        return ( 
            <div className="members-container">
                <div className="add-member-header flex spase-between">
                    <h3>Members</h3>
                    <button onClick={this.props.toggleMembers}>X</button>
                </div>
                <h3>filter</h3>
                <div className="new-member-list flex column">
                    {users.map(user => <div key={user._id} className="member-items flex space-between" onClick={() => this.onToggleUser(user)}>
                        <div className="flex space-between"><div  className="member-item"><span>{utilService.convertName(user.fullname)}</span>
                        </div>
                        <p>{user.fullname}</p></div>
                        <button className={(members.findIndex(currUser => currUser._id === user._id) > -1)?
                             'checked-member': 'unchecked-member'}>
                            <img src="https://res.cloudinary.com/basimgs/image/upload/v1610900476/checked_etlnj9.png" alt=""/>
                            </button>
                        </div>)}
                </div>
            </div>
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
