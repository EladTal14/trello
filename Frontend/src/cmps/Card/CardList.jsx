import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview.jsx'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import { CardAddForm } from './CardAddForm.jsx'


export class CardList extends Component {
    state = {
        scrollTop: 0
    }

    getListStyle = isDraggingOver => ({
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 5,
        position: "relative",
    })

    render() {
        const { cards, id, groupTitle, group, onAddCard } = this.props
        if (!cards) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>

        return (
            <div className="card-list" ref={this.props.refs} onScroll={this.props.onScroll}>
                <Droppable droppableId={group.id} type="card">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            {cards.map((card, index) =>

                                <CardPreview key={card.id} card={card} group={group}
                                    index={index} groupId={id} groupTitle={groupTitle} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <CardAddForm onAddCard={onAddCard} groupId={group.id} onScroll={this.props.onScroll} />

            </div >
        )
    }
}



