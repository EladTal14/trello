import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'
import { CardAdd } from './CardAdd';
export function CardList({ cards, id, groupTitle, group, onAddCard }) {
    const getListStyle = isDraggingOver => ({
        padding: 5,
        width: 245,
        position: "relative",
        backgroundColor: (isDraggingOver) ? 'lightgray' : 'unset'
    })
    if (!cards) return <div>Loading Cards...</div>
    return (
        <div className="card-list">
            <Droppable droppableId={group.id} type="card">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}>
                        {cards.map((card, index) =>
                            <CardPreview key={card.id} card={card} group={group}
                                index={index} groupId={id} groupTitle={groupTitle} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <CardAdd groupId={group.id} onAddCard={onAddCard} />
        </div >
    )
}
