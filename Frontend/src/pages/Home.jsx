import { Link } from 'react-router-dom'
export function Home() {
    return (
        <main className="home-container">
            <div className="home-img"></div>
            <div className="text-container flex column">
                <h1 className="h1-main-header">Welcome to TasKooler</h1>
                <h3 className="h3-secondary-header">TasKooler enables you and your team to organize and prioritize all your shit in a fun, flexible way.</h3>
                <Link to="/boards" className="boards-btn" className="get-started-btn">GET STARTED!</Link>
            </div>

        </main>
    )
}