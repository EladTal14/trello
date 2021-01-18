import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    console.log(board.style);
    return (
        <Link to={`/board/${board._id}`}>
            <div style={{
                backgroundImage: `url(${board.style.backgroundImage})`,
            }} className="board-preview">
                <h1 >{board.title}</h1>
            </div>
        </Link>
    )
}