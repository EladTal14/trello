import React, { Component } from 'react'
import { cardService } from '../services/cardService.js'

export class CardDetails extends Component {

  state = {
    card: null
  }

  componentDidMount() {
    const { card } = this.props
    this.setState({ card })
  }

  onHandleInputChange = ({ target }) => {
    const { value } = target
    this.setState(prevState => ({
      card: {
        ...prevState.card,
        title: value
      }
    }))
  }

  render() {
    const { card } = this.state
    if (!card) return <div>Loading...</div>
    let cardWithTxt = (
      <input
        className="title-input my-input"
        type="text"
        name="title"
        value={card.title}
        onChange={this.onHandleInputChange}
        placeholder={card.title}
      />
    )

    return (
      <div className="card-details">
        {cardWithTxt}
        <h1>hey</h1>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(CardEdit)