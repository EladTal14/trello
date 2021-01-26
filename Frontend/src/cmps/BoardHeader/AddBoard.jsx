import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'

export class AddBoard extends Component {

    state = {
        board: {
            title: '',
            imgUrlLarge: '',
            imgUrlmedium: ''
        },
        mounted: false,
        picked: ''
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    onClose = () => {
        this.setState({ mounted: false })
    }

    bgColors = () => {

        return [{ imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_300/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg'},
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_300/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg'},
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_300/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg'},
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_300/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg'},
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712052/pexels-pixabay-461940_znnsxj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_300/v1610712052/pexels-pixabay-461940_znnsxj.jpg'},
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/green-1_rp1fjx.jpg', imgUrlmedium:'https://res.cloudinary.com/basimgs/image/upload/v1611084082/green-1_rp1fjx.jpg' },
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/cooldownpink_y0m0db.jpg', imgUrlmedium:'https://res.cloudinary.com/basimgs/image/upload/v1611084082/cooldownpink_y0m0db.jpg' },
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/mizu_qlr5uq.png', imgUrlmedium:'https://res.cloudinary.com/basimgs/image/upload/v1611084082/mizu_qlr5uq.png' },
        { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/0322_purple_hkmphn.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/v1611084082/0322_purple_hkmphn.jpg'}]
      }

    setBgcImg = (imgUrlLarge, imgUrlmedium, idx) => {
        this.setState(prevState => {
            return {board: { ...prevState.board, imgUrlLarge, imgUrlmedium}}
        })
        this.setState({ picked: idx })
    }

    onAddBoard = (ev) => {
        ev.preventDefault()
        const { title, imgUrlLarge, imgUrlmedium } = this.state.board
        const board = { title, style: {backgroundImage: imgUrlLarge, backgroundImagePreview: imgUrlmedium} }
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
        })
    }

    render() {
        const { mounted, picked } = this.state
        return (
            <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleAddBoard}>
            <div className="new-board-modal flex column">
            <div className="new-board-header flex space-around">
                <h3>Create New Board</h3>
                <button onClick={this.onClose}>✕</button>
            </div>
                <div className="board-cover-colors">
                        {this.bgColors().map((color, idx) => {
                            return <div className={(picked === idx)? "new-board-color picked": "new-board-color"} key={idx}
                                onClick={() => this.setBgcImg(color.imgUrlLarge ,color.imgUrlmedium, idx)}><img src={color.imgUrlmedium} alt=""/></div>
                        })}
                </div>
                <form onSubmit={this.onAddBoard}><input type="text" name="title" value={this.state.title} onChange={this.handleInput}
                    className="add-board-input" placeholder="Enter a board title..." autoComplete="off" required/>
                    <button className="create-board-btn">Create board</button></form>
            </div>
            </CSSTransition>
        )
    }
}
