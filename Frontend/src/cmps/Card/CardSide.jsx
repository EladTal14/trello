import React, { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { cardService } from '../../services/cardService';
import { CardCover } from './CardCover';
import { CardLabels } from './CardLabels';
import { AddMember } from '../AddMember';

export class CardSide extends Component {

  state = {
    value: new Date(),
    isDateShown: false,
    isLabelsShown: false,
    isCoverMenuShown: false,
    isMoreMembersShown: false
  }

  onRemoveCard = () => {
    this.props.onRemoveCard()
  }

  toggleMembers = () => {
    this.setState({ isMoreMembersShown: !this.state.isMoreMembersShown })
  }

  toggleDate = () => {
    this.setState({ isDateShown: !this.state.isDateShown })
  }

  toggleCoverMenu = () => {
    this.setState({ isCoverMenuShown: !this.state.isCoverMenuShown })
  }

  onChange = (value) => {
    this.setState({ value }, () => this.props.onSavedueDate((this.state.value + '').substring(4, 32)))
    this.toggleDate()
  }

  onAddChecklist = () => {
    const checklist = cardService.createChecklist()
    this.props.addOrCancelChecklist(checklist)
  }

  onToggleLabels = () => {
    this.setState({ isLabelsShown: !this.state.isLabelsShown })
  }


  render() {
    const { value, isDateShown, isLabelsShown, isCoverMenuShown, isMoreMembersShown } = this.state
    const { card, onHandleLabelsChange, saveChanges, users } = this.props
    return (
      <>
        {isLabelsShown && <CardLabels saveChanges={saveChanges} card={card} onToggleLabels={this.onToggleLabels} onHandleLabelsChange={onHandleLabelsChange} />}
        {isCoverMenuShown && <CardCover onFinishUpload={this.props.onUploadCardCoverImg}
          onUpdateCoverColor={this.props.onUpdateCoverColor} toggleCoverMenu={this.toggleCoverMenu} />}
        {isDateShown && <div>
          <Calendar style={{zIndex: 2000, position:'absolute'}}
            onChange={this.onChange}
            value={value}
          />
        </div>} 
        {isMoreMembersShown && <AddMember toggleMembers={this.toggleMembers} onUpdateMembers={this.props.onUpdateMembers} members={card.members} users={users}/> }
        {/* <DatePicker /> */}
        <div className="card-side flex column">
          <button className="side-btn" onClick={this.toggleMembers}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="" />
            </span> Members</button>

          <button className="side-btn" onClick={this.onToggleLabels}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610794160/price-tag_evse4z.png" alt="" />
            </span> Labels</button>

          {!card.checklist && <button className="side-btn" onClick={this.onAddChecklist}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610794290/check-box_srgv0c.png" alt="" />
            </span> Checklist</button>}

          <button className="side-btn" onClick={this.toggleDate}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
            </span> Due date</button>

          <button className="side-btn" onClick={this.toggleCoverMenu}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610793767/picture_omnffh.png" alt="" />
            </span> Cover</button>

          <button className="side-btn" onClick={this.onRemoveCard}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610793816/trash_nrq5xi.png" alt="" />
            </span> Delete</button>
        </div>
      </>
    )
  }
}
