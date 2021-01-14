import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { CardDetails } from './CardDetails'

export class CardPreview extends Component {
    state = {
        isDetailsShown: false
    }

    toggleDetails = () => {
        this.setState({ isDetailsShown: !this.state.isDetailsShown })
    }

    render() {
        const { card, index, groupTitle, group } = this.props
        return (
            <div className="card-preview">
                {/* <div className="card-preview"> */}
                {this.state.isDetailsShown &&
                    <React.Fragment>
                        <div className="modalcover" onClick={(ev) => this.toggleDetails(ev, true)}> </div>
                        <CardDetails card={card} group={group} groupTitle={groupTitle} />
                    </React.Fragment>}
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <div className="card-preview"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
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

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,
    borderRadius: '8px',
    // change background colour if dragging
    background: isDragging ? "red" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});