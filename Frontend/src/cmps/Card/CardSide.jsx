import React, { Component } from 'react'



export class CardSide extends Component {

  onRemoveCard = () => {
    this.props.onRemoveCard()
  }



  render() {
    return (
      <div className="card-side flex column">
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="" /></span> Members</button>
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610794160/price-tag_evse4z.png" alt="" /></span> Labels</button>
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610794290/check-box_srgv0c.png" alt="" /></span> Checklist</button>
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" /></span> Due date
        </button>

        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610793767/picture_omnffh.png" alt="" /></span> Cover</button>
        <button className="side-btn" onClick={this.onRemoveCard}><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" alt="" /></span> Delete</button>

      </div>
    )
  }
}
