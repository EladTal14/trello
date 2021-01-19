
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'
class _BoardPhotos extends Component {

  photos = () => {
    return [{ imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg' }
      , { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610814691/pexels-aphiwat-chuangchoem-358904_vyfkhj.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063798/pexels-pixabay-301494_iwx7bt.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063800/pexels-pixabay-414102_pwa09f.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063800/pexels-steve-397857_n8hqga.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1611063805/pexels-roberto-shumski-1903702_vtanbj.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712046/pexels-pixabay-2150_mujmra.jpg' },
    { imgUrl: 'https://res.cloudinary.com/basimgs/image/upload/v1610712043/pexels-abdullah-ghatasheh-1631677_jmc0uh.jpg' }
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
        {this.photos().map((photo, idx) => { return <div key={idx} className="menu-img-box"><img onClick={() => this.useImgForBgc(photo.imgUrl)} className="board-photos-grid" src={photo.imgUrl} alt="not good" /></div>})}
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
