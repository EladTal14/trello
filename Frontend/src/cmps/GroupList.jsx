import { GroupPreview } from "./GroupPreview.jsx"
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export function GroupList({ groups }) {
    const [state, setState] = useState(groups);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
        // console.log('groups', groups);
        // console.log('source', source);
        // console.log('destination', destination);
        // console.log('state[sInd].cards', state[sInd].cards);

        if (sInd === dInd) {
            console.log('IN IF');
            const items = reorder(state[sInd].cards, source.index, destination.index);
            // console.log('items', items);
            const newState = [...state];
            newState[sInd].cards = items;
            setState(newState);
        } else {

            console.log('IN ELSE');
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }
    return <article className="group-list">
        <DragDropContext onDragEnd={onDragEnd}>
            {groups.map((group, idx) => {
                return <GroupPreview key={group.id} group={group} idx={idx} />
            })}
        </DragDropContext>
    </article>

}
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    // console.log(source, destination, droppableSource, droppableDestination);
    const sourceClone = Array.from(source);
    // console.log('Clones ', sourceClone);
    const destClone = Array.from(destination);
    // console.log('destClone ', destClone);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    // console.log([removed]);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    // console.log('result', result);
    return result;
};