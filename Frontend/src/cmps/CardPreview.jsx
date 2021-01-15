import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import { utilService } from '../services/utilService'
import { eventBusService } from '../services/eventBusService.js'
import { setCard, setGroup } from '../store/actions/cardAction.js'


export class _CardPreview extends Component {
    state = {
        isLableTitleShown: false
    }

    toggleLableTitle = (ev) => {
        ev.stopPropagation()
        this.setState({ isLableTitleShown: !this.state.isLableTitleShown })
    }

    onShowCard = (card, group) => {
        this.props.setCard(card)
        this.props.setGroup(group)
        eventBusService.emit('show-details', true)
    }

    render() {
        const { card, index, group } = this.props
        const { isLableTitleShown } = this.state
        return (
            <div className="card-preview" onClick={() => this.onShowCard(card, group)}>
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <div className="card-preview"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        // onClick={() => this.toggleDetails('ev', false)}
                        >
                            {card.labels && <div className="label-conyainer flex">
                                {card.labels.map(label => {
                                    return <div key={label.id} style={{ backgroundColor: label.color }} className={isLableTitleShown ? 'card-label-open' : 'card-label'} onClick={this.toggleLableTitle}>
                                        {isLableTitleShown && label.title}
                                    </div>
                                })}
                            </div>}
                            {card.title}
                            <div className="card-extras-container flex space-between">
                                {card.dueDate && <div className="date-container flex">
                                    <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
                                    <p className="date">{utilService.getDueDate(card.dueDate)}</p></div>}
                                {card.members && <div className="members-container flex">
                                    {card.members.map(member => {
                                        return <div key={member._id} className="member">
                                            {utilService.convertName(member.fullname)}
                                        </div>
                                    })}
                                </div>}

                            </div>



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
