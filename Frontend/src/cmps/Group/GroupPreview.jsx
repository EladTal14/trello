import React, { Component } from 'react'
import { CardList } from '../Card/CardList.jsx'
import { Draggable } from "react-beautiful-dnd";
import { GroupTitle } from './GroupTitle';
import { CardAdd } from '../Card/CardAdd.jsx';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'

export class GroupPreview extends Component {
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
        const { group, idx, onAddCard, updateBoard } = this.props
        return (
            <Draggable draggableId={group.id} index={idx} >
                {(provided, snapshot) => (
                    <NaturalDragAnimation
                        style={provided.draggableProps.style}
                        snapshot={snapshot}
                    >
                        {style => (
                            // <div>
                            <article className="group-preview" {...provided.draggableProps}
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, style)}
                                ref={provided.innerRef}>
                                <div  {...provided.dragHandleProps} style={{ width: 272, height: '0.8rem', outline: 'none' }}>
                                </div>
                                <GroupTitle updateBoard={updateBoard} group={group} dragHandle={provided.dragHandleProps} />
                                <CardList refs={this.refCard} cards={group.cards}
                                    id={idx} group={group} onScroll={this.onScroll}
                                    grpTitle={group.title} groupId={group.id} onAddCard={onAddCard} />
                                <CardAdd groupId={group.id} onScroll={this.onScroll} />
                            </article>
                            // </div>
                        )}
                    </NaturalDragAnimation>
                )}
            </Draggable>
        )
    }
}
const getItemStyle = (isDragging, draggableStyle, style) => ({
    // userSelect: 'none',
    // padding: 8,
    margin: `0 8px 0 0`,
    ...draggableStyle,
    ...style
});