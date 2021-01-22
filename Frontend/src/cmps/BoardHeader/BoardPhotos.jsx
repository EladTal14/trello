
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'
class _BoardPhotos extends Component {

 
  photos = () => {
    return [{ imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg'},
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712052/pexels-pixabay-461940_znnsxj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712052/pexels-pixabay-461940_znnsxj.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712052/pexels-pixabay-461940_znnsxj.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063807/pexels-pixabay-33545_zzzi4o.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063807/pexels-pixabay-33545_zzzi4o.jpg' , imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063807/pexels-pixabay-33545_zzzi4o.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063800/pexels-steve-397857_n8hqga.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063800/pexels-steve-397857_n8hqga.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063800/pexels-steve-397857_n8hqga.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063805/pexels-roberto-shumski-1903702_vtanbj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063805/pexels-roberto-shumski-1903702_vtanbj' , imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063805/pexels-roberto-shumski-1903702_vtanbj' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712046/pexels-pixabay-2150_mujmra.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712046/pexels-pixabay-2150_mujmra.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712046/pexels-pixabay-2150_mujmra.jpg' }
    ]
  }


  useImgForBgc = async (imgUrlLarge, imgUrlmedium) => {
    const { currBoard } = this.props
    currBoard.style.backgroundImage = imgUrlLarge
    currBoard.style.backgroundImagePreview = imgUrlmedium
    await this.props.saveBoard(currBoard)
    this.props.toggleMenu()
  }
  render() {
    return (
      <div className="board-photos flex justify-center">
        {this.photos().map((photo, idx) => { return <div key={idx} className="menu-img-box"><img onClick={() => this.useImgForBgc(photo.imgUrlLarge, photo.imgUrlmedium)} className="board-photos-grid" src={photo.imgUrlSmall} alt="not good" /></div>})}
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
