import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

export class AddBoard extends Component {

    state = {
        board: {
            title: '',
            imgUrl: ''
        },
        mounted: false
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    onClose = () => {
        this.setState({ mounted: false })
    }

    // coverColors = () => {
    //     return ['#f9ed69', '#a56cc1', '#f38181', '#95e1d3', '#878ecd', '#3fc1c9',
    //         '#a1dd70', '#ffcc29']
    // }

    bgColors = () => {

        return [{ imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063805/pexels-roberto-shumski-1903702_vtanbj.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063803/pexels-pixabay-268533_twp7q4.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063800/pexels-pixabay-414102_pwa09f.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063801/pexels-pixabay-302769_elwsut.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063804/pexels-pixabay-247431_pazkxw.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/green-1_rp1fjx.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/cooldownpink_y0m0db.jpg' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/mizu_qlr5uq.png' },
        { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/0322_purple_hkmphn.jpg' }]
      }

    setBgcImg = (imgUrl) => {
        console.log('the chosen url is', imgUrl);
        this.setState(prevState => {
            return {board: { ...prevState.board, imgUrl}}
        })
    }

    onAddBoard = () => {
        const { title, imgUrl } = this.state.board
        const board = { title, style: {backgroundImage: imgUrl} }
        this.props.addBoard(board)
        this.onClose()
    }

    handleInput = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState(prevState => {
            return {
                board: {
                    ...prevState.board,
                    [name]: value
                }
            }
        }, () => console.log('input title',this.state.board.title ))
    }

    render() {
        const { mounted } = this.state
        return (
            <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleAddBoard}>
            <div className="new-board-modal flex column">
            <div className="new-board-header flex space-around">
                <h3>Create New Board</h3><button onClick={this.onClose}>✕</button>
            </div>
                <div className="board-cover-colors">
                        {this.bgColors().map((color, idx) => {
                            return <div className="new-board-color" key={idx}
                                onClick={() => this.setBgcImg(color.imgUrl)}><img src={color.imgUrl} alt=""/></div>
                        })}
                </div>
                <input type="text" name="title" value={this.state.title} onChange={this.handleInput}
                    className="add-board-input" placeholder="Enter a board title..." autoComplete="off"/>
                    <button onClick={this.onAddBoard} className="create-board-btn">Create board</button>
            </div>
            </CSSTransition>
        )
    }
}
