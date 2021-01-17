import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview.jsx'
import { CardAdd } from './CardAdd';
import { Component } from 'react'


export class CardList extends Component {
    state = {
        scrollTop: 0
    }
    refCard = React.createRef()
    getListStyle = isDraggingOver => ({
        padding: 5,
        width: 245,
        position: "relative",
        backgroundColor: (isDraggingOver) ? 'lightgray' : 'unset'
    })

    onScroll = (ev, scrolltobottom = 0) => {
        if (!scrolltobottom) return
        const scrollTop = this.refCard.current.scrollTop
        this.setState({
            scrollTop: scrollTop
        }, () => {
            if (scrolltobottom)
                this.refCard.current.scrollTop = this.refCard.current.scrollTop + scrolltobottom
        })
    }
    render() {
        const { cards, id, groupTitle, group, onAddCard } = this.props
        if (!cards) return <div>Loading Cards...</div>

        return (
            <div className="card-list" ref={this.refCard} onScroll={this.onScroll}>
                <Droppable droppableId={group.id} type="card">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            {cards.map((card, index) =>
                                <CardPreview key={card.id} card={card} group={group}
                                    index={index} groupId={id} groupTitle={groupTitle} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <CardAdd groupId={group.id} onAddCard={onAddCard} onScroll={this.onScroll} />
            </div >
        )
    }
}
