export function CardHeader({ card, onHandleInputChange, group }) {
  return (
    <div className="card-header">
      <div className="card-title-area flex">
        <img className="card-title-img" src="https://res.cloudinary.com/basimgs/image/upload/v1610782307/document-header_xtqrpy.png" alt=""/>
        <textarea
          className="title-textarea my-input"
          type="text"
          name="title"
          value={card.title}
          onChange={onHandleInputChange}
          placeholder={card.title}
          spellCheck="false"
        />
      </div>
      <p className="card-title-p">In List in {group.title}</p>
    </div>
  )
}
