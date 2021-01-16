
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'
class _BoardPhotos extends Component {

  photos = () => {
    return [{ imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271954/samples/landscapes/nature-mountains.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271951/samples/landscapes/beach-boat.jpg' }
      , { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712048/pexels-riccardo-bertolo-4245826_eoizb4.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610271947/samples/landscapes/girl-urban-view.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712045/pexels-roberto-nickson-2559941_cguwhp.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712052/pexels-pixabay-461940_znnsxj.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712044/pexels-sourav-mishra-3136673_tvifhm.jpg' }
    ]
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
        {this.photos().map((photo, idx) => { return <div key={idx} className="menu-img-box"><img onClick={() => this.useImgForBgc(photo.imgUrl)} className="board-photos-grid" key={idx} src={photo.imgUrl} alt="not good" /></div> })}
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
