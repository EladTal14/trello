import React, { Component } from 'react'
import { utilService } from '../services/utilService.js'

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

    onSaveGroup = (ev) => {
        ev.preventDefault()
        const group = { title: this.state.group.title, id: utilService.makeId() }
        console.log('saving new group...', group)
        this.props.onAddGroup(group)
        this.setState(
            {
                group: { title: '' },
                isAddOpen: false
            })
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


    render() {
        const { isAddOpen, group } = this.state
        return <section className="board-container">
            {isAddOpen &&
                <form onSubmit={this.onSaveGroup}>
                    <input type="text" name="title" value={group.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter group title..." autoFocus/>
                    <button className="submit-group-btn">Add group</button>
                </form>
            }
            {!isAddOpen && <button className="add-group-btn" onClick={this.openInput}>+ Add another group</button>}
        </section>
    }
}
