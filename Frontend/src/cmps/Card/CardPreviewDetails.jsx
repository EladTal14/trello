import React, { Component } from 'react'

export class CardPreviewDetails extends Component {
  state = {
    card: null,
    userClicked: null
  }
  componentDidMount() {
    // this.setState({ card: this.props.card }, () => console.log(this.state.card))
    this.setState({ card: this.props.card, userClicked: this.props?.userClicked })
  }

  render() {
    const { userClicked, card } = this.state
    if ((!card || !userClicked) || Object.keys(userClicked).length) return <div>Loading...</div>
    return (
      <div className="card-preview-details" style={{ position: 'absolute', zIndex: 10000, top: userClicked?.y, right: userClicked?.x }}>
        <pre>xxxxxx
        xxxxxxxx
        xxxxxxxx
        </pre>
      </div>
    )
  }
}
