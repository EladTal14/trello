import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return (
        <Link style={{ width: '240px' }} to={`/board/${board._id}`}>
            <div style={{
                backgroundImage: `url(${board.style.backgroundImagePreview})`, backgroundColor: "#6DB3F2",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} className="board-preview">
                <h1 >{board.title}</h1>
            </div>
        </Link>
    )
}