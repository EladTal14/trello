import React, { Component } from 'react'
// import {cardService} from '../services/cardService.js'

export class CardEdit extends Component {

  state = {
    card: null
  }

  async componentDidMount() {
    const { cardId } = this.props.match.params
    if (cardId) {
      // const card = await cardService.getCard(cardId)
      // this.setState({ card })
    }
  }


  render() {
    return (
      <div className="card-edit">
        
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(CardEdit)