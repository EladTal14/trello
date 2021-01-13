import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export class CardPreview extends Component {

    render() {
        const { card, index } = this.props
        return (
            <div className="card-preview">
                <Link to={`/board/edit/${card.id}`}>
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                            >
                                {card.title}
                            </div>
                        )}

                    </Draggable>
                </Link>
            </div>
        )
    }
}

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
