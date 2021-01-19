import { Component } from 'react'
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux'
import { eventBusService } from '../../services/eventBusService.js'
import { setCard, setGroup } from '../../store/actions/cardAction.js'
import { CardPreviewLabel } from './CardPreviewLabel';
import { CardPreviewBottom } from './CardPreviewBottom';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'
import { CardPreviewDetails } from './CardPreviewDetails.jsx';
export class _CardPreview extends Component {
    state = {
        showDetails: false,
        userClicked: {
            x: null,
            y: null
        }
    }
    onShowCard = (card, group) => {
        this.props.setCard(card)
        this.props.setGroup(group)
        eventBusService.emit('show-details', true)
    }
    showDetails = (ev) => {
        console.log('ev', ev);
        ev.stopPropagation()
        this.setState(prevState => {
            return {
                ...prevState,
                showDetails: !this.state.showDetails,
                userClicked: { x: ev.clientX, y: ev.clientY }
            }
        })
    }
    render() {
        const { card, index, group } = this.props
        const { showDetails, userClicked } = this.state
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
                                    {card.style && (card.style.imgUrl ? <div className="card-img-cover" style={{ backgroundImage: `url(${card.style.imgUrl}` }} ></div> :
                                        <div className="card-color-cover" style={{ backgroundColor: card.style.color }}></div>)}
                                    <CardPreviewLabel card={card} />
                                    <div className="flex space-between">
                                        <pre>{card.title}</pre>
                                        <button className="show-preview-details-btn" onClick={(ev) => this.showDetails(ev)}>C</button>

                                    </div>
                                    <CardPreviewDetails card={card} />
                                    <CardPreviewBottom card={card} />
                                </article>
                            )}
                        </NaturalDragAnimation>
                    )}
                </Draggable>
                {showDetails && <CardPreviewDetails card={showDetails ? card : null} userClicked={userClicked} />}
            </div>
        )
    }
}

const getItemStyle = (isDragging, draggableStyle, style) => ({
    userSelect: 'none',
    padding: 8,
    margin: `0 0 ${8}px 0`,
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
