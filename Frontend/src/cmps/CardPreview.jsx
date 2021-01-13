import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CardPreview extends Component {

    render() {
        const { card } = this.props
        return (
            <div className="card-preview">
                <Link to={`/board/edit/${card.id}`}>
                    Edit/Details
                    </Link>
                    <h1 >{card.title}</h1>
            </div>
        )
    }
}