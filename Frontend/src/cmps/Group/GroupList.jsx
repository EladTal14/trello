import { GroupPreview } from './GroupPreview.jsx'

export function GroupList({ groups, onAddCard, onAddGroup }) {
    return (
        <div className="group-list">
            {groups.map((group, idx) =>
                <GroupPreview key={group.id} group={group} idx={idx} onAddCard={onAddCard} />
            )}
        </div>
    )
}

