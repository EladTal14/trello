import React, { Component } from 'react'
import { utilService } from '../../services/utilService.js'

export class GroupAdd extends Component {

    state = {
        isAddOpen: false,
        group: {
            title: ''
        }
    }

    openInput = () => {
        this.setState({
            isAddOpen: true
        })
    }

    closeInput = () => {
        this.setState({
            isAddOpen: false
        })
    }

    onSaveGroup = (ev) => {
        ev.preventDefault()
        const group = { title: this.state.group.title, id: utilService.makeId(), cards: [] }
        this.props.onAddGroup(group)
        this.setState(
            {
                group: { title: '' },
                isAddOpen: false
            })
    }

    handleInput = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState(prevState => {
            return {
                group: {
                    ...prevState.group,
                    [name]: value
                }
            }
        })
    }

    render() {
        const { isAddOpen, group } = this.state
        return <section className="add-group-container">
            {isAddOpen &&
                <form onSubmit={this.onSaveGroup} className="new-group-form">
                    <input type="text" name="title" value={group.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter group title..." autoFocus autoComplete="off" />
                    <div>
                        <button className="submit-group-btn">Add group</button>
                        <button onClick={this.closeInput} className="close-input-btn" ><img src="https://res.cloudinary.com/basimgs/image/upload/v1610646476/close_voj9v3.png" alt="" /></button>
                    </div>
                </form>
            }
            {!isAddOpen && <button className="add-group-btn" onClick={this.openInput}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" />
                <span>Add another group</span></button>}
        </section>
    }
}
