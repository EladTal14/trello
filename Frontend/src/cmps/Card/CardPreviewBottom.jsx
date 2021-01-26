import React from 'react'
import { utilService } from '../../services/utilService'

export function CardPreviewBottom({ card }) {
    
    const progress = utilService.getTodoProgress(card)

    return (
        <div className="card-extras-container flex space-between">
            {card.dueDate && <div className={card.dueDate < Date.now()? 'dueDate-container red flex':'dueDate-container flex'}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
                <p className="dueDate">{utilService.getDueDate(card.dueDate)}</p></div>}
            {card.comments && <div className="comments-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610704026/messenger_ypya0t.png" alt="" />
                <p className="comments">{card.comments.length}</p></div>}
            {card.checklist && <div className={(progress.done===progress.total)? 'check-list-container complete flex' : 'chec-klist-container flex'}>
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/check-box_pzd2ul.png" alt="" />
                <p className="chec-klist">{progress.done}/{progress.total}</p></div>}
            {card.members && <div className="preview-members-container flex">
                {card.members.map(member => {
                    return <div key={member.fullname} className="member" 
                    style={{ backgroundImage: `url(${(member.imgUrl) ? member.imgUrl : '#3f72af'})` }}>
                    </div>
                })}
            </div>}
        </div>
    )
}

