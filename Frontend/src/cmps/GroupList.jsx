import { GroupPreview } from "./GroupPreview.jsx"
import React from "react";

export function GroupList({ groups, onAddCard }) {
    return (
        <article className="group-list">{
            groups.map((group, idx) => {
                return <GroupPreview key={group.id} group={group} idx={idx} onAddCard={onAddCard} />
            })}
        </article>
    )
}

