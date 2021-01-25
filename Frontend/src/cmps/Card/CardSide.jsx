import React, { Component } from 'react'
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { cardService } from '../../services/cardService';
import { CardCover } from './CardCover';
import { CardLabels } from './CardLabels';
import { AddMember } from '../AddMember';
import { DatePicker } from './DatePicker';
// import { DatePicker } from '@material-ui/pickers';

export class CardSide extends Component {

  state = {
    // value: new Date(),
    isDateShown: false,
    isLabelsShown: false,
    isLabelsMenuShown: false,
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

  toggleLabelMenu = () => {
    this.setState({ isLabelsMenuShown: !this.state.isLabelsMenuShown })
    window.isLabelsMenuShown = this.state.isLabelsMenuShown
  }



  onAddChecklist = () => {
    const checklist = cardService.createChecklist()
    this.props.addOrCancelChecklist(checklist)
  }

  onToggleLabels = () => {
    this.setState({ isLabelsShown: !this.state.isLabelsShown })
  }




  render() {
    const { isDateShown, isCoverMenuShown, isMoreMembersShown, isLabelsMenuShown } = this.state
    const { card, onHandleLabelsChange, saveChanges, users } = this.props
    return (
      <>
        {isLabelsMenuShown && <CardLabels saveChanges={saveChanges} card={card} onToggleLabels={this.onToggleLabels} toggleLabelMenu={this.toggleLabelMenu} onHandleLabelsChange={onHandleLabelsChange} />}
        {isCoverMenuShown && <CardCover onFinishUpload={this.props.onUploadCardCoverImg}
          onUpdateCoverColor={this.props.onUpdateCoverColor} toggleCoverMenu={this.toggleCoverMenu} />}
        {isDateShown && <DatePicker onSavedueDate={this.props.onSavedueDate} toggleDate={this.toggleDate} />}
        {isMoreMembersShown && <AddMember toggleMembers={this.toggleMembers}
          onUpdateMembers={this.props.onUpdateMembers} onSetUserFilter={this.props.onSetUserFilter} members={card.members} users={users} />}
        {/* {isMoreMembersShown && <div className="card-details-member-container"><AddMember toggleMembers={this.toggleMembers}
          onUpdateMembers={this.props.onUpdateMembers} onSetUserFilter={this.props.onSetUserFilter} members={card.members} users={users} /></div>} */}
        {/* <DatePicker /> */}
        <div className="card-side flex column">
          <h2 className="card-side-header">add to card</h2>
          <button className="side-btn" onClick={this.toggleMembers}>
            <span>
              <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/user_g2y481.png" alt="" />
            </span> Members</button>

          <button className="side-btn" onClick={this.toggleLabelMenu}>
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
            </span> Due Date</button>

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
