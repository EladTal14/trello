import React from 'react'
import { CardList } from './CardList'
import { Draggable } from "react-beautiful-dnd";
import { CardAdd } from './CardAdd';
import { GroupTitle } from './GroupTitle';

export function GroupPreview({ group, idx, onAddCard }) {
    return (
        <Draggable draggableId={group.id} index={idx} >
            {(provided, snapshot) => (
                <div {...provided.draggableProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    ref={provided.innerRef}>
                    <article className="group-preview" >
                        <div  {...provided.dragHandleProps} style={{ width: '110%', height: '1.175em' }}>
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
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: 'none',
    // padding: 8,
    // margin: `0 0 ${8}px 0`,
    // borderRadius: '3px',
    // // change background colour if dragging
    // background: isDragging ? 'red' : 'white',
    transform: isDragging ? `rotate(20deg)` : null,
    // styles we need to apply on draggables
    ...draggableStyle
});