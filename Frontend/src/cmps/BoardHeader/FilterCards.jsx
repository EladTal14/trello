import React, { Component } from 'react'

export class FilterCards extends Component {

  state = {
    cardsToShow: null,
    filterBy: {
      fullname: ''
    }
  }

  componentDidMount() {
    // this.setCardToShow()
    // this.setCardToShow(this.props.board.groups)
    // this.setState({cardsToShow: this.props.board.groups})
    // console.log('this.props.board', this.props.board.groups)
    // console.log('this.props.members', this.props.members)
  }

  setCardToShow = () => {
    const prevGroups = this.props.board.groups
    const board = { ...this.props.board }

    const regex = new RegExp('adir', 'i')
    // const regex = new RegExp(this.state.filterBy.fullname, 'i')

    const res = prevGroups.filter(group => {

      group.cards = group.cards.filter(card => {

        card.members = card.members.filter(member => {
          return regex.test(member.fullname)
        })
        if (!card.members || card.members.length < 1 ) return null
        return card
      })

      return group
    })

    board.groups = res
    // this.props.saveBoard(board)
    console.log('RES', res)

  }

  onHandleInputChange = ({ target }) => {
    const { name } = target
    const { value } = target

    this.setState(prevState => ({
      ...prevState,
      filterBy: {
        ...prevState.filterBy,
        [name]: value
      }
    }), () => this.setCardToShow())
  }

  render() {
    return (
      <div className="filter-cards">
        <input
          type="text"
          placeholder="Filter by user..."
          name="fullname"
          value={this.state.filterBy.fullname}
          onChange={this.onHandleInputChange}
        />
      </div>
    )
  }
}
