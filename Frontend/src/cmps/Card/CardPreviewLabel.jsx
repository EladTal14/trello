import React, { Component } from 'react'

export class CardPreviewLabel extends Component {
    state = {
        isLableTitleShown: false
    }

    toggleLableTitle = (ev) => {
        ev.stopPropagation()
        this.setState({ isLableTitleShown: !this.state.isLableTitleShown })
    }

    render() {
        const { card } = this.props
        const { isLableTitleShown } = this.state
        return (
            <div>
                {card.labels && <div className="label-container flex">
                    {card.labels.map(label => {
                        return <div key={label.id} style={{ backgroundColor: label.color }} className={isLableTitleShown ? 'card-label open' : 'card-label'} onClick={this.toggleLableTitle}>
                            {isLableTitleShown && label.title}
                        </div>
                    })}
                </div>}
            </div>
        )
    }
}
