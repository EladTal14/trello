
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'
class _BoardPhotos extends Component {

  photos = () => {
    return [{ imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271954/samples/landscapes/nature-mountains.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271951/samples/landscapes/beach-boat.jpg' }
      , { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271956/samples/landscapes/landscape-panorama.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271947/samples/landscapes/girl-urban-view.jpg' }]
  }
  useImgForBgc = async (imgUrl) => {
    const { currBoard } = this.props
    currBoard.style.backgroundImage = imgUrl
    await this.props.saveBoard(currBoard)
    this.props.toggleMenu()
  }
  render() {
    return (
      <div className="board-photos">
        {this.photos().map((photo, idx) => { return <img onClick={() => this.useImgForBgc(photo.imgUrl)} className="board-photos-grid" key={idx} src={photo.imgUrl} alt="not good" /> })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currBoard: state.boardModule.currBoard
})

const mapDispatchToProps = {
  saveBoard,

}

export const BoardPhotos = connect(mapStateToProps, mapDispatchToProps)(_BoardPhotos)
