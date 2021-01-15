import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export function BoardPreview({ board }) {

    return (
        <div className="board-preview">
            <Link to={`/board/${board._id}`}>
                <h1>A Board Preview</h1>
                <h1 >{board.title}</h1>
            </Link>
        </div>
    )
}