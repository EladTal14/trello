import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview.jsx'
import { CardAdd } from './CardAdd';
import { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export class CardList extends Component {
    state = {
        scrollTop: 0
    }
    // refCard = React.createRef()
    getListStyle = isDraggingOver => ({
        padding: 5,
        width: 245,
        position: "relative",
        backgroundColor: (isDraggingOver) ? 'lightgray' : 'unset'
    })

    onScroll = (ev, scrolltobottom = 0) => {
        if (!scrolltobottom) return
        const scrollTop = this.refCard.current.scrollTop
        this.setState({
            scrollTop: scrollTop
        }, () => {
            if (scrolltobottom)
                this.props.ref.current.scrollTop = this.props.ref.current.scrollTop + scrolltobottom
        })
    }
    render() {
        const { cards, id, groupTitle, group } = this.props
        if (!cards) return <div>Loading Cards...</div>

        return (
            // <div className="card-list" ref={this.refCard} onScroll={this.props.onScroll}>
            <div className="card-list" ref={this.props.refs} onScroll={this.props.onScroll}>
                <Droppable droppableId={group.id} type="card">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={this.getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            <TransitionGroup className="cards-preview-list">
                                {cards.map((card, index) =>
                                    <CSSTransition
                                        key={card.id}
                                        timeout={500}
                                        classNames="item"
                                    >
                                        <CardPreview key={card.id} card={card} group={group}
                                            index={index} groupId={id} groupTitle={groupTitle} />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div >
        )
    }
}


// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import {
//     Container,
//     ListGroup,
//     Button,
// } from 'react-bootstrap';
// import {
//     CSSTransition,
//     TransitionGroup,
// } from 'react-transition-group';
// import uuid from 'uuid';

// import './styles.css';

// function TodoList() {
//     const [items, setItems] = useState([
//         { id: uuid(), text: 'Buy eggs' },
//         { id: uuid(), text: 'Pay bills' },
//         { id: uuid(), text: 'Invite friends over' },
//         { id: uuid(), text: 'Fix the TV' },
//     ]);
//     return (
//         <Container style={{ marginTop: '2rem' }}>
//             <ListGroup style={{ marginBottom: '1rem' }}>
//                 <TransitionGroup className="todo-list">
//                     {items.map(({ id, text }) => (
//                         <CSSTransition
//                             key={id}
//                             timeout={500}
//                             classNames="item"
//                         >
//                             <ListGroup.Item>
//                                 <Button
//                                     className="remove-btn"
//                                     variant="danger"
//                                     size="sm"
//                                     onClick={() =>
//                                         setItems(items =>
//                                             items.filter(item => item.id !== id)
//                                         )
//                                     }
//                                 >
//                                     &times;
//                 </Button>
//                                 {text}
//                             </ListGroup.Item>
//                         </CSSTransition>
//                     ))}
//                 </TransitionGroup>
//             </ListGroup>
//             <Button
//                 onClick={() => {
//                     const text = prompt('Enter some text');
//                     if (text) {
//                         setItems(items => [
//                             ...items,
//                             { id: uuid(), text },
//                         ]);
//                     }
//                 }}
//             >
//                 Add Item
//       </Button>
//         </Container>
//     );
// }

// ReactDOM.render(
//     <TodoList />,
//     document.getElementById('root')
// );
