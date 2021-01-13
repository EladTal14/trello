import React, { Component } from 'react'
import { cardService } from '../services/cardService.js'

export class CardEdit extends Component {

  state = {
    card: null
  }

  async componentDidMount() {
    cardService.query().then((res) =>
      console.log(res)
    )
    // const { cardId } = this.props.match.params
    // if (cardId) {
    //   const card = await cardService.getCard(cardId)
    //   this.setState({ card })
    // }
  }


  render() {
    // const { card } = this.state
    // let cardWithTxt = (
    // <input
    // type="text"
    // name="title"
    // value={card.title}
    // // onChange={this.loginHandleChange}
    // placeholder={card.title}
    // >{card.title}</input>
    // )

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