import React, { Component } from 'react'
import { CardList } from '../Card/CardList.jsx'
import { Draggable } from "react-beautiful-dnd";
import { GroupTitle } from './GroupTitle';
import { CardAdd } from '../Card/CardAdd.jsx';


export class GroupPreview extends Component {
    // function isScroll() {

    // }
    state = {
        scrollTop: 0
    }
    refCard = React.createRef()
    onScroll = (ev, scrolltobottom = 0) => {
        if (!scrolltobottom) return
        const scrollTop = this.refCard.current.scrollTop
        this.setState({
            scrollTop: scrollTop
        }, () => {
            if (scrolltobottom)
                this.refCard.current.scrollTop = this.refCard.current.scrollTop + scrolltobottom
        })
    }
    render() {
        const { group, idx, onAddCard } = this.props
        return (
            <Draggable draggableId={group.id} index={idx} >
                {(provided, snapshot) => (
                    <div {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        ref={provided.innerRef}>
                        <article className="group-preview">
                            <div  {...provided.dragHandleProps} style={{ width: 272, height: '1.175em' }}>
                            </div>
                            <GroupTitle group={group} />
                            <CardList refs={this.refCard} cards={group.cards} id={idx} group={group} onScroll={this.onScroll}
                                grpTitle={group.title} groupId={group.id} onAddCard={onAddCard} />
                            <CardAdd groupId={group.id} onAddCard={onAddCard} onScroll={this.onScroll} />
                        </article>
                    </div>
                )}
            </Draggable>
        )
    }
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