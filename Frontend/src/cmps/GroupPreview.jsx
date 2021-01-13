import React, { Component } from 'react'
import { CardList } from './CardList'

export class GroupPreview extends Component {

    render() {
        const { group } = this.props
        return (
            <div className="group-preview">
                <h1 >{group.title}</h1>
                <CardList cards={group.cards} />
                <button>+ Add another card</button>
            </div>
        )
    }
}
