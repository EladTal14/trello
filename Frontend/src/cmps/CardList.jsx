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
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
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
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 5,
    width: 230
});
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log(source, destination);
    const sourceClone = Array.from(source);
    console.log('Clones ', sourceClone);
    const destClone = Array.from(destination);
    console.log('destClone ', destClone);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log([removed]);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log('result', result);
    return result;
};