import React from 'react'
import { utilService } from '../../services/utilService'
import { CardPreviewFeature } from './CardPreviewFeature'
const _ = require('lodash');

export function CardPreviewBottom({ card }) {
    
    const progress = utilService.getTodoProgress(card)
    // const iconsMap = [
    //     { dueDate: "https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" },
    //     {comments: "https://res.cloudinary.com/basimgs/image/upload/v1610704026/messenger_ypya0t.png"},
    //     {checklist: "https://res.cloudinary.com/basimgs/image/upload/v1610625361/check-box_pzd2ul.png"}
    // ]

    // const content = [
    //     { dueDate: utilService.getDueDate(card.dueDate) },
    //     {comments: card.comments?.length},
    //     {checklist: progress?.done/progress?.total},
    //     {members: card.members?.map(member => {
    //         return <div key={member.fullname} className="member">
    //             {utilService.convertName(member.fullname)}
    //         </div>
    //     })}
    // ]

        
        // {
        //     card[type] && <div className={`${type}-container flex`}>
        //         <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
        //         <p className="date">{utilService.getDueDate(card.dueDate)}</p></div>
        // }

    const types = Object.keys(card)

    return (
        <div className="card-extras-container flex space-between">
            {/* { Object.keys(card).map((prop, idx) => {
                return < CardPreviewFeature key={idx} card={ card } type = { prop } src = { iconsMap.prop } content = { content.prop } />
            })} */}
            {card.dueDate && <div className="dueDate-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/clock_zwp9d9.png" alt="" />
                <p className="dueDate">{utilService.getDueDate(card.dueDate)}</p></div>}
            {card.comments && <div className="comments-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610704026/messenger_ypya0t.png" alt="" />
                <p className="comments">{card.comments.length}</p></div>}
            {card.checklist && <div className="checklist-container flex">
                <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/check-box_pzd2ul.png" alt="" />
                <p className="checklist">{progress.done}/{progress.total}</p></div>}
            {card.members && <div className="preview-members-container flex">
                {card.members.map(member => {
                    return <div key={member.fullname} className="member">
                        {utilService.convertName(member.fullname)}
                    </div>
                })}
            </div>}
        </div>
    )
}

