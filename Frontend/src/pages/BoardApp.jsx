import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupList } from '../cmps/GroupList';
import { BoardHeader } from '../cmps/BoardHeader'
import { loadBoard } from '../store/actions/boardAction'

export class _BoardApp extends Component {


    componentDidMount() {
        // this.props.loadBoard(this.props.filterBy)
        console.log('page is ready')
        this.props.loadBoard()
        console.log('Got from store:', this.props);
    }

    // onRemove = (boardId) => {
    //     this.props.removeBoard(boardId)

    // }


    render() {
        const { groups } = this.props.board
        console.log('groups',groups);
        const load = <p>Loading...</p>
        return (!groups? load :
            <section className="board-container">
                <h1>groups...</h1>
                input <input type="text" className="my-input" placeholder="something...."/>
                <BoardHeader />
                <button className="add-board-btn">+ Add another group</button>
                <GroupList groups={groups}/>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        // filterBy: state.boardModule.filterBy,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    // removeBoard,
    // setFilter,
    // logout,
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
