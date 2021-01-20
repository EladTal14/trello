import { GroupAdd } from './GroupAdd.jsx';
import { GroupPreview } from './GroupPreview.jsx'

export function GroupList({ groups, onAddCard, onAddGroup, onScroll, updateBoard }) {
    return (
        <div className="group-list">
            {groups.map((group, idx) =>
                <GroupPreview updateBoard={updateBoard} key={group.id} group={group} idx={idx} onAddCard={onAddCard} />
            )}
            <GroupAdd onAddGroup={onAddGroup} onScroll={onScroll} />

        </div>
    )
}

