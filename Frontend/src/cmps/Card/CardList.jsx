import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview.jsx'
import { Component } from 'react'
import Loader from 'react-loader-spinner'


export class CardList extends Component {
    state = {
        scrollTop: 0
    }
    // refCard = React.createRef()
    getListStyle = isDraggingOver => ({
        // padding: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        position: "relative",
        // backgroundColor: (isDraggingOver) ? 'lightgray' : 'unset'
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
        if (!cards) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={400} width={400} timeout={3000} /></div>

        return (
            // <div className="card-list" ref={this.refCard} onScroll={this.props.onScroll}>
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
                {/* {isAddOpen &&
                    <form onSubmit={() => { return }} className="new-card-form">
                        <textarea type="text" name="title" value={card.title} onChange={this.handleInput}
                            className="my-input" placeholder="Enter a card title..." autoFocus required
                            cols="35" rows="4"></textarea>
                        <div className="flex">
                            <button type="submit" onMouseDown={this.onSaveCard} className="submit-card-btn">Add card</button>
                            <button onClick={this.closeInput} className="close-input-btn" >
                                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610646476/close_voj9v3.png" alt="" />
                            </button>
                        </div>
                    </form>
                } */}
            </div >
        )
    }
}



