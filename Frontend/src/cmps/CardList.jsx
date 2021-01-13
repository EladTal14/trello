import React, { useState } from 'react'
import { CardPreview } from "./CardPreview.jsx"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export function CardList({ cards, id }) {


    console.log(cards);
    if (!cards) return <div>Loading Cards...</div>
    return <article className="card-list">

        <Droppable key={id} droppableId={`${id}`}>
            {(provided, snapshot) => (
                <div

                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                >
                    {cards.map((card, index) => {
                        return (
                            <CardPreview key={card.id} card={card} index={index} />
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

    </article >

}

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 5,
    width: 230,

});
