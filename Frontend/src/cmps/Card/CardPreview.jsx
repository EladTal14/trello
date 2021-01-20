import { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import { eventBusService } from '../../services/eventBusService.js'
import { setCard, setGroup } from '../../store/actions/cardAction.js'
import { CardPreviewLabel } from './CardPreviewLabel';
import { CardPreviewBottom } from './CardPreviewBottom';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
export class _CardPreview extends Component {

    onShowCard = (card, group) => {
        this.props.setCard(card)
        this.props.setGroup(group)
        eventBusService.emit('show-details', true)
    }
    showPreviewDetails = (ev, card, group) => {
        this.props.setCard(card)
        this.props.setGroup(group)
        ev.stopPropagation()
        eventBusService.emit('show-preview-details', ev, true)
    }

    render() {
        const { card, index, group } = this.props
        return (
            <div className="card-preview" onClick={() => this.onShowCard(card, group)}>
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <NaturalDragAnimation
                            style={provided.draggableProps.style}
                            snapshot={snapshot}
                        >
                            {style => (
                                <article className="card-preview"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, style)}
                                >
                                    <button className="show-preview-details-btn" onClick={(ev) => this.showPreviewDetails(ev, card, group)}><img className="show-preview-details-pen" src="https://res.cloudinary.com/basimgs/image/upload/v1610873061/pen_lgmg47.png" alt="pen" /></button>
                                    {card.style && (card.style.imgUrl ? <div className="card-img-cover" style={{ backgroundImage: `url(${card.style.imgUrl}` }} ></div> :
                                        <div className="card-color-cover" style={{ backgroundColor: card.style.color }}></div>)}
                                    <div className="lower-card">
                                        <CardPreviewLabel card={card} />
                                        <div className="flex space-between">
                                            <pre>{card.title}</pre>

                                        </div>
                                        <CardPreviewBottom card={card} />

                                    </div>
                                </article>
                            )}
                        </NaturalDragAnimation>
                    )}
                </Draggable>
            </div>
        )
    }
}

const getItemStyle = (isDragging, draggableStyle, style) => ({
    userSelect: 'none',
    padding: '0',

    margin: '0 4px 8px 3px',
    borderRadius: '3px',
    background: isDragging ? '##e4e0e0' : 'white',
    boxShadow: `0 1px 0 rgba(9, 30, 66, 0.25)`,
    ...draggableStyle,
    ...style
});

const mapStateToProps = state => {
    return {
        currCard: state.cardModule.currCard
    }
}

const mapDispatchToProps = {
    setCard,
    setGroup
}

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);
