import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
        const { card, index } = this.props
        return (
            <div className="card-preview">
                {this.state.isDetailsShown &&
                    <React.Fragment>
                        <div className="modalcover" onClick={(ev) => this.toggleDetails(ev, true)}> </div>
                        <CardDetails card={card} />
                    </React.Fragment>}

                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                            // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, snapshot)}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            onClick={() => this.toggleDetails('ev', false)}
                        >
                            {card.title}
                        </div>
                    )}

                </Draggable>

            </div>
        )
    }
}

// function getItemStyle(isDragging, draggableStyle, snapshot) {
//     if (!snapshot.isDropAnimating) {
//         return draggableStyle;
//     }
//     // some basic styles to make the items look a bit nicer
//     const userSelect = "none"
//     const padding = 8 * 2
//     const margin = `0 0 8px 0`
//     const { moveTo, curve, duration } = snapshot.dropAnimation;
//     // change background colour if dragging
//     const background = isDragging ? "green" : "grey"
//     const translate = `translate(${moveTo.x - 10}px, ${moveTo.y - 10}px)`;
//     const transform = `${translate}`
//     const transition = `all ${curve} ${duration + 1}s`
//     return {
//         ...draggableStyle,
//         userSelect, padding, margin, background,
//         transform, transition

//     }

// };
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? "red" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});