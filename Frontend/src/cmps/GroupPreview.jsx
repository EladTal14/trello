import React, { useState } from 'react'
import { CardList } from './CardList'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function GroupPreview({ group, idx, onAddCard }) {



    return (
        <div className="group-preview">
            <h1 >{group.title}</h1>
            <CardList cards={group.cards} id={idx} />
            <button>+ Add another card</button>
        </div>
    )
}
