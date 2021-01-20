import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {
    return (
        <Link style={{ width: '280px' }} to={`/board/${board._id}`}>
            <div style={{
                backgroundImage: `url(${board.style.backgroundImagePreview})`, backgroundColor: "#6DB3F2",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                // background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.65) 100%)",
            }} className="board-preview">
                <h1 >{board.title}</h1>
            </div>
        </Link>
    )
}