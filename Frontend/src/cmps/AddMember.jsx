import { GroupPreview } from './GroupPreview.jsx'
import React, { Component } from 'react'

export class AddMember extends Component {

    render() {
        const { users } = this.props
        return (
            <div className="membars-container">
                <div>
                    <h3>Members</h3>
                    <button>X</button>
                </div>
                <h3>filter</h3>
                <div className="new-member-list">
                    {users.map(user => <div><div>MM</div>{user.fullname}</div>)}
                </div>
            </div>
        )
    }
}
