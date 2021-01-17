import { Component } from 'react'
import { utilService } from '../../services/utilService.js'

export class CardAdd extends Component {
    state = {
        isAddOpen: false,
        card: {
            title: ''
        }
    }

    openInput = () => {
        this.setState({
            isAddOpen: true
        }, () => this.props.onScroll(null, 100))

    }

    closeInput = () => {
        this.setState({
            isAddOpen: false
        })
    }

    onSaveCard = (ev) => {
        ev.preventDefault()
        const card = { title: this.state.card.title, id: utilService.makeId() }
        this.props.onAddCard(card, this.props.groupId)
        this.setState(
            {
                card: { title: '' },
                isAddOpen: false
            })
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
        return <section className="add-card-container">
            {isAddOpen &&
                <form onSubmit={this.onSaveCard} onBlur={this.closeInput} className="new-card-form">
                    <textarea type="text" name="title" value={card.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter a title card title..." autoFocus
                        cols="35" rows="4"></textarea>
                    <div>
                        <button className="submit-card-btn">Add card</button>
                        <button onClick={this.closeInput} className="close-input-btn" ><img src="https://res.cloudinary.com/basimgs/image/upload/v1610646476/close_voj9v3.png" alt="" /></button>
                    </div>
                </form>
            }
            {!isAddOpen && <button className="add-card-btn" onClick={this.openInput}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" />
                <span>Add another card</span></button>}
        </section>
    }
}