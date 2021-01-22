import { Component } from 'react'
import { utilService } from '../../services/utilService.js'
import { connect } from 'react-redux'
import { toggleAddCard } from '../../store/actions/cardAction.js'
import { eventBusService } from '../../services/eventBusService.js'

export class CardAdd extends Component {
    state = {
        isAddOpen: false,
    }
    componentDidMount() {
        this.eventBusTerminate = eventBusService.on('close-card-add', this.closeInput)
    }

    componentWillUnmount() {
        this.eventBusTerminate()
    }
    openInput = () => {
        this.setState({ isAddOpen: true }, () => {
            this.props.onScroll(null, 1000)
            eventBusService.emit('open-card-add', { isAddOpen: true, groupId: this.props.groupId })
        })
    }

    closeInput = ({ groupId }) => {
        this.setState({ isAddOpen: false }, () => setTimeout(() => {
            if (this.props.groupId === groupId)
                this.props.onScroll(null, 1000)
        }, 150))
    }

    render() {
        const { isAddOpen } = this.state
        return (
            <section className="add-card-container" >
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
                {!isAddOpen && <button className="add-card-btn" onClick={this.openInput}>
                    <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" />
                    <span>Add another card</span></button>}
            </section>
        )
    }
}
