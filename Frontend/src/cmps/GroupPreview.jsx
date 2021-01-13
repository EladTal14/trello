import React, { Component } from 'react'
import { CardList } from './CardList'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export class GroupPreview extends Component {

    onDragEnd(result) {
        // const { source, destination } = result;

        // // dropped outside the list
        // if (!destination) {
        //     return;
        // }
        // const sInd = +source.droppableId;
        // const dInd = +destination.droppableId;

        // if (sInd === dInd) {
        //     const items = reorder(state[sInd], source.index, destination.index);
        //     const newState = [...state];
        //     newState[sInd] = items;
        //     setState(newState);
        // } else {
        //     const result = move(state[sInd], state[dInd], source, destination);
        //     const newState = [...state];
        //     newState[sInd] = result[sInd];
        //     newState[dInd] = result[dInd];

        //     setState(newState.filter(group => group.length));
        // }
        // }
        return
    }

    render() {
        const { group } = this.props
        console.log(group);
        return (
            <div className="group-preview">
                <h1 >{group.title}</h1>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <CardList cards={group.cards} id={group.id} />
                    <button>+ Add another card</button>
                </DragDropContext>

            </div>
        )
    }
}

