import React from 'react'
import { CardList } from './CardList'
import { Draggable } from "react-beautiful-dnd";
import { CardAdd } from './CardAdd';
import { GroupTitle } from './GroupTitle';

export function GroupPreview({ group, idx, onAddCard }) {
    return (
        <Draggable draggableId={group.id} index={idx} >
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <article className="group-preview" >
                        <div  {...provided.dragHandleProps} style={{ width: '110%', height: '1.175em', zIndex: -1 }}>
                        </div>
                        <GroupTitle group={group} />
                        <CardList cards={group.cards} id={idx} group={group} grpTitle={group.title} groupId={group.id} onAddCard={onAddCard} />
                        {/* <CardAdd groupId={group.id} onAddCard={onAddCard} /> */}
                    </article>
                </div>
            )}
        </Draggable>
    )
}
