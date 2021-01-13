import { GroupPreview } from "./GroupPreview.jsx"
import { connect } from 'react-redux'
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export function GroupList({ groups, onAddCard, onDragCard }) {
    const [state, setState] = useState(groups);
    window.statest = state
    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd].cards, source.index, destination.index);
            const newState = [...state];
            newState[sInd].cards = items;
            setState(newState);
            onDragCard(newState)
        } else {
            // console.log('state[dInd]', state);
            const result = move(state[sInd].cards, state[dInd].cards, source, destination);
            const newState = [...state];
            newState[sInd].cards = result[sInd];
            newState[dInd].cards = result[dInd];
            setState(newState);
            onDragCard(newState)
            // setState(newState.filter(group => group.length));
        }
    }
    return <article className="group-list">
        <DragDropContext onDragEnd={onDragEnd}>

            {groups.map((group, idx) => {
                return <GroupPreview key={group.id} group={group} idx={idx} onAddCard={onAddCard} />
            })
            }
            {/* <DragDropContext> */}

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
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};

const mapStateToProps = (state) => ({
    board: state.boardModule.currBoard
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
