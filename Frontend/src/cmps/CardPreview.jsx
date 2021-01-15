import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import { eventBusService } from '../services/eventBusService.js'
import { setCard, setGroup } from '../store/actions/cardAction.js'
import { CardPreviewLabel } from './CardPreviewLabel';
import { CardPreviewBottom } from './CardPreviewBottom';


export class _CardPreview extends Component {

    onShowCard = (card, group) => {
        this.props.setCard(card)
        this.props.setGroup(group)
        eventBusService.emit('show-details', true)
    }

    render() {
        const { card, index, group } = this.props
        return (
            <div className="card-preview" onClick={() => this.onShowCard(card, group)}>
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <article className="card-preview"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        // onClick={() => this.toggleDetails('ev', false)}
                        >
                            <CardPreviewLabel card={card} />
                            <pre>{card.title}</pre>
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

const mapStateToProps = state => {
    return {
        currCard: state.cardModule.currCard
    }
}

const mapDispatchToProps = {
    setCard,
    setGroup
}

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);
