import { CardChecklist } from "./CardChecklist"

export function CardInfo({ card, onHandleInputChange, onHandleChecklistChange, openTodoAdd }) {

  return (
    <div className="card-info">

      {card.members && <div className="members">
        <h2>Members</h2>
        {card.members.map((member, idx) => {
          //TODO: nice time stemp // member.fullname // find first show of space in regex
          return <div key={idx} className="member">{member.fullname.charAt(1).toUpperCase()}</div>
        })}
      </div>}

      {card.labels && <div className="labels">
        <h2>labels</h2>
        {card.labels.map((label, idx) => {
          return <button key={idx} className="label-btn" >{label.title}</button>
        })}
      </div>}

      {card.dueDate && <div className="due-date-wrapper">
        <h2>due date</h2>
        {/* TODO: nice time stemp */}
        <p className="due-date">{card.dueDate}</p>
      </div>}

      <div className="description">
        <h2>Description</h2>
        <textarea
          className="desc-textarea my-input"
          type="text"
          name="description"
          value={card.description || ''}
          onChange={onHandleInputChange}
          placeholder="Add more detailed description..."
        />
      </div>

      {card.checklist && <CardChecklist card={card} openTodoAdd={openTodoAdd} onHandleChecklistChange={onHandleChecklistChange} />}
      
      <div className="activity-container">
        <div className="activity-header">
          <span>L </span>
          <span>Activity</span>
        </div>
        <div className="flex">
          <div className="member">BK</div>
          <textarea
            className="activity-textarea"
            type="text"
            name="activity"
            value={card.title}
            onChange={onHandleInputChange}
            placeholder={card.title}
          />
        </div>
        <div className="activity-comment-wrapper flex">
          <div className="member">BK</div>
          <div className="activity-comment">
            <p>comment area this is the</p>
            <span>Time </span>
          </div>
        </div>
      </div>

    </div>
  )
}
