
import React, { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DatePicker } from './DatePicker'

export class CardSide extends Component {

  state = {
    value: new Date(),
    isDateShown: false
  }

  onRemoveCard = () => {
    this.props.onRemoveCard()
  }

  // toggleDate = () => {
  //   this.setState({ isDateShown: !this.state.isDateShown })
  // }

  onChange = (value) => {
    this.setState( { value }, () => this.props.onSavedueDate((this.state.value + '').substring(4, 32))) 
    this.toggleDate()
    
  }


  render() {
    const { value, isDateShown } = this.state
    return (
      <div className="card-side flex column">
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="" /></span> Members</button>
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610794160/price-tag_evse4z.png" alt="" /></span> Labels</button>
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610794290/check-box_srgv0c.png" alt="" /></span> Checklist</button>
        <button className="side-btn" onClick={this.toggleDate}><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" /></span> Due date
        </button>
        {/* {isDateShown && <div>
          <Calendar style={{zIndex: 2000, position:'relative'}}
            onChange={this.onChange}
            value={value}
          />
        </div>} */}
        <DatePicker />
        <button className="side-btn"><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610793767/picture_omnffh.png" alt="" /></span> Cover</button>
        <button className="side-btn" onClick={this.onRemoveCard}><span><img src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" alt="" /></span> Delete</button>

      </div>
    )
  }
}
