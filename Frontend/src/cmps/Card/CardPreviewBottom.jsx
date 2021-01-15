import React from 'react'
import { utilService } from '../../services/utilService'

export function CardPreviewBottom({ card }) {

    const progress = utilService.getTodoProgress(card)

    return (
        <div className="card-extras-container flex space-between">
            {card.dueDate && <div className="date-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
                <p className="date">{utilService.getDueDate(card.dueDate)}</p></div>}
            {card.comments && <div className="comment-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610704026/messenger_ypya0t.png" alt="" />
                <p className="comment">{card.comments.length}</p></div>}
            {card.checklist && <div className="checklist-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/check-box_pzd2ul.png" alt="" />
                <p className="checklist">{progress.done}/{progress.total}</p></div>}
            {card.members && <div className="members-container flex">
                {card.members.map(member => {
                    return <div key={member._id} className="member">
                        {utilService.convertName(member.fullname)}
                    </div>
                })}
            </div>}
        </div>
    )
}

