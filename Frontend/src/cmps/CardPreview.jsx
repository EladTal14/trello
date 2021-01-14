import React, { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { CardDetails } from './CardDetails'
import { utilService } from '../services/utilService'


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
        const { isLableTitleShown } = this.state
        return (
            <div className="card-preview">
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