import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return (
        <Link to={`/board/${board._id}`}>
            <div style={{ backgroundColor: board.style.backgroundColor }} className="board-preview">
                <h1 >{board.title}</h1>
            </div>
        </Link>
    )
}