import { utilService } from "../../services/utilService"
import { CardActivityContainer } from "./CardActivityContainer";
import { CardChecklist } from "./CardChecklist"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import moment from "moment"

export function CardInfo({ card, onHandleInputChange, onHandleChecklistChange, onHandleActivitiesChange, addOrCancelChecklist, onRemoveDueDate }) {
  return (
    <div className="card-info">

      {card.members && <div className="members flex column">
        <h2 className="members-header">Members</h2>
        {/* <div className="members-list flex"> */}
        <TransitionGroup className="members-list flex">
          {card.members.map((member, idx) => 
          <CSSTransition key={idx} timeout={500} classNames="item">
             <span key={idx} className="member" 
             style={{ backgroundImage: `url(${(member.imgUrl) ? member.imgUrl : '#3f72af'})` }}></span>
             {/* style={{backgroundColor: member.color? member.color: "#3f72af"}}>{utilService.convertName(member.fullname)}</span> */}
             </CSSTransition>
        )}
          </TransitionGroup>
        {/* </div> */}
      </div>}
      {card.labels && card.labels.length > 0 && <div className="card-labels-section">
        <h2 className="card-label-h2">Labels</h2>
      <TransitionGroup className="flex labels-container">
        {/* <div className="flex labels-container"> */}
          {card.labels.map((label, idx) => 
             <CSSTransition key={idx} timeout={500} classNames="item">
             <button key={idx} className="label-btn" style={{ backgroundColor: label.color }}>{label.title}</button>
          </CSSTransition>)}
        {/* </div> */}
        </TransitionGroup>
      </div>}

      {card.dueDate && <div className="due-date-wrapper">
        <h2 className="due-date-h2">Due Date</h2>
        <div className="flex">
        <p className="due-date">{moment(card.dueDate).format('LLL')}</p>
        <button className="delete-date-btn" onClick={onRemoveDueDate}>✕</button></div>
      </div>}

      <div className="card-description">
        <div className="flex">
          <span><img className="desc-img" src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/left-align_qaakok.png" alt="" /></span>
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

      {card.checklist?.todos?.length > 0 &&
        <CardChecklist card={card} onHandleChecklistChange={onHandleChecklistChange} addOrCancelChecklist={addOrCancelChecklist} />}
      <CardActivityContainer card={card} onHandleActivitiesChange={onHandleActivitiesChange} />
    </div>
  )
}

