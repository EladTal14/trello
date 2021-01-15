import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { CardDetails } from './CardDetails'
import { CardPreviewLabel } from './CardPreviewLabel';
import { CardPreviewBottom } from './CardPreviewBottom';


export class CardPreview extends Component {
    state = {
        isDetailsShown: false,
        isLableTitleShown: false
    }

    toggleDetails = () => {
        this.setState({ isDetailsShown: !this.state.isDetailsShown })
    }

    toggleLableTitle = (ev) => {
        ev.stopPropagation()
        this.setState({ isLableTitleShown: !this.state.isLableTitleShown })
    }



    render() {
        const { card, index, groupTitle, group } = this.props
        return (
            <div className="card-preview">
                {this.state.isDetailsShown &&
                    <React.Fragment>
                        <div className="modalcover" onClick={(ev) => this.toggleDetails(ev, true)}> </div>
                        <CardDetails card={card} group={group} groupTitle={groupTitle} />
                    </React.Fragment>}
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <article className="card-preview"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            onClick={() => this.toggleDetails('ev', false)}
                        >
                            <CardPreviewLabel card={card} />
                            {card.title}
                            <CardPreviewBottom card={card} />
                        </article>
                    )}

                </Draggable>

            </div>
        )
    }
}

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8,
    margin: `0 0 ${8}px 0`,
    borderRadius: '3px',
    // change background colour if dragging
    background: isDragging ? 'red' : 'white',
    transform: isDragging ? `rotate(20deg)` : null,
    // styles we need to apply on draggables
    ...draggableStyle
});