import { Component } from 'react'
import { utilService } from '../../services/utilService.js'

export class CardAdd extends Component {
    state = {
        isAddOpen: false,
        card: {
            title: '',
        }
    }

    openInput = () => {
        this.setState({
            isAddOpen: true
        }, () => this.props.onScroll(null, 1000))

    }

    closeInput = () => {
        this.setState({
            isAddOpen: false,
            card: {
                title: ''
            }
        }, () => setTimeout(() => {
            this.props.onScroll(null, 1000)
        }, 150))
    }

    onSaveCard = (ev) => {
        ev.preventDefault()
        if (!this.state.card.title) return
        const card = { title: this.state.card.title, id: utilService.makeId(), members: [] }
        this.props.onAddCard(card, this.props.groupId)
        this.setState(
            {
                card: { title: '' },

            }, () => this.closeInput())
    }

    handleInput = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState(prevState => {
            return {
                card: {
                    ...prevState.card,
                    [name]: value
                }
            }
        })
    }

    render() {
        const { isAddOpen, card } = this.state
        return <section className="add-card-container" onBlur={this.closeInput} >
            {isAddOpen &&
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
            }
            {!isAddOpen && <button className="add-card-btn" onClick={this.openInput}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" />
                <span>Add another card</span></button>}
        </section>
    }
}