
export function CardHeader({ card, onHandleInputChange, groupTitle }) {

  return (
    <div className="card-header">
      <div className="card-title-area flex">
        <span>L</span>
        <textarea
          className="title-textarea my-input"
          type="text"
          name="title"
          value={card.title}
          onChange={onHandleInputChange}
          placeholder={card.title}
        />
      </div>
      <p>In List in {groupTitle}</p>
    </div>
  )
}
