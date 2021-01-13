import React, { Component } from 'react'
import { CardDetails } from './CardDetails'

export class CardPreview extends Component {

    state = {
        isDetailsShown: false
    }

    toggleDetails = (ev, needPrevent) => {
        // if (needPrevent) ev.stoppropagation()

        this.setState({ isDetailsShown: !this.state.isDetailsShown })
    }

    render() {
        const { card } = this.props
        return (
            <div className="card-preview">
                {this.state.isDetailsShown &&
                    <React.Fragment>
                        <div className="modalcover" onClick={(ev) => this.toggleDetails(ev, true)}> </div>
                        <CardDetails card={card} />
                    </React.Fragment>}
                <h1 onClick={() => this.toggleDetails('ev', false)}>{card.title}</h1>
            </div>
        )
    }
}