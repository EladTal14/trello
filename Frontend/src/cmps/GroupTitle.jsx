import React, { Component } from 'react'
import { utilService } from '../services/utilService.js'

export class GroupTitle extends Component {

    state = {
        group: {
            title: this.props.group.title
        }
    }


    // onSaveGroup = (ev) => {
    //     ev.preventDefault()
    //     const group = { title: this.state.group.title, id: utilService.makeId() }
    //     console.log('saving new group...', group)
    //     this.props.onAddGroup(group)
    //     this.setState(
    //         {
    //             group: { title: '' },
    //             isAddOpen: false
    //         })
    // }

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
        const { group } = this.state
        return <section className="group-title">
                    <input type="text" name="title" value={group.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter group title..." autoComplete="off"/>
        </section>
    }
}