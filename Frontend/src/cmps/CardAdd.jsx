import React, { Component } from 'react'
import { utilService } from '../services/utilService.js'

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
        const value = target.value

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
                <form onSubmit={this.onSaveCard}>
                    {/* <input type="text" name="title" value={card.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter a title card title..." autoFocus /> */}
                    <textarea type="text" name="title" value={card.title} onChange={this.handleInput}
                        className="my-input" placeholder="Enter a title card title..." autoFocus 
                        cols="26" rows="5"></textarea>
                    <button className="submit-card-btn">Add card</button>
                </form>
            }
            {!isAddOpen && <button className="add-card-btn" onClick={this.openInput}>+ Add another card</button>}
        </section>
    }
}