import { utilService } from "../../services/utilService"
import { CardActivityContainer } from "./CardActivityContainer";
import { CardChecklist } from "./CardChecklist"
var moment = require('moment');

export function CardInfo({ card, onHandleInputChange, onHandleChecklistChange, onHandleActivitiesChange }) {
  return (
    <div className="card-info">

      {card.members && <div className="members flex column">
        <h2 className="members-header">Members</h2>
        <div className="members-list flex">
          {card.members.map((member, idx) => {
            return <span key={idx} className="member">{utilService.convertName(member.fullname)}</span>
          })}
        </div>
      </div>}

      {card.labels && <div className="card-labels">
        <h2 className="card-label-h2">labels</h2>
        {card.labels.map((label, idx) => {
          return <button key={idx} className="label-btn" >{label.title}</button>
        })}
      </div>}

      {card.dueDate && <div className="due-date-wrapper">
        <h2 className="due-date-h2">due date</h2>
        <p className="due-date">{moment(card.dueDate).format('LLL')}</p>
      </div>}

      <div className="card-description">
        <div className="flex">
          <span><img className="desc-img" src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/left-align_qaakok.png" alt=""/></span>
        <h3>Description</h3>
          </div>
        <textarea
          className="desc-textarea my-input"
          type="text"
          name="description"
          value={card.description || ''}
          onChange={onHandleInputChange}
          placeholder="Add more detailed description..."
        />
      </div>

      {card.checklist && <CardChecklist card={card} onHandleChecklistChange={onHandleChecklistChange} />}
      <CardActivityContainer card={card} onHandleActivitiesChange={onHandleActivitiesChange} />
    </div>
  )
}

// USE IT LATER FOR CALENDER
// {/* <div>
// <Calendar
//   onChange={onChange}
//   defaultActiveStartDate={new Date(2017, 0, 1)}

//   // value={new Date(1610705369396)}
// />
// </div> */}