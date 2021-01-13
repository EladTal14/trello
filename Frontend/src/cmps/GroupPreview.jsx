import React, { useState } from 'react'
import { CardList } from './CardList'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

<<<<<<< HEAD
export class GroupPreview extends Component {


    render() {
        const { group } = this.props
        console.log(group);
        return (
            <div className="group-preview">
                <h1 >{group.title}</h1>

                <CardList cards={group.cards} id={group.id} />
                <button>+ Add another card</button>


            </div>
        )
    }
}
=======
export function GroupPreview({ group, idx }) {



    return (
        <div className="group-preview">
            {/* <h1 >{group.title}</h1> */}
>>>>>>> liel

            <CardList cards={group.cards} id={idx} />

            {/* <button>+ Add another card</button> */}

        </div>
    )

}
