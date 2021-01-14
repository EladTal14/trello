import React, { useState } from 'react'
import { CardList } from './CardList'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardAdd } from './CardAdd';
import { GroupTitle } from './GroupTitle';

export function GroupPreview({ group, idx, onAddCard }) {



    return (
        <div className="group-preview">
            {/* <h1 >{group.title}</h1> */}
            <GroupTitle group={group} />
            <CardList cards={group.cards} id={idx} group={group} grpTitle={group.title} groupId={group.id} />
            <CardAdd groupId={group.id} onAddCard={onAddCard} />
        </div>
    )
}
