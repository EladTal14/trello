
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'
class _BoardPhotos extends Component {


  photos = () => {
    return [{ imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712043/pexels-roberto-nickson-2885320_ghwa3m.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712043/pexels-vishnu-r-nair-1105666_nkvc5j.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611385391/sq-92babc9a34c3443f8a5049859caf4799_cwfiw3.webp', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611385391/sq-92babc9a34c3443f8a5049859caf4799_cwfiw3.webp', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611385391/sq-92babc9a34c3443f8a5049859caf4799_cwfiw3.webp' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712045/pexels-eberhard-grossgasteiger-844297_xsbtqx.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/v1611388221/ak5cUXibbvJDtkYeDGv6.width-1280_wwbrjj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/v1611388221/ak5cUXibbvJDtkYeDGv6.width-1280_wwbrjj.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/v1611388221/ak5cUXibbvJDtkYeDGv6.width-1280_wwbrjj.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712048/pexels-eberhard-grossgasteiger-1287145_iyiwh5.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814688/pexels-asad-photo-maldives-1450353_oq4mbu.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814689/pexels-frans-van-heerden-624015_fjsy7m.jpg' },
    
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611500194/pexels-asad-photo-maldives-1450360_jyudu1.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611500194/pexels-asad-photo-maldives-1450360_jyudu1.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611500194/pexels-asad-photo-maldives-1450360_jyudu1.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611500182/pexels-julius-silver-753325_gnne5q.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611500182/pexels-julius-silver-753325_gnne5q.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611500182/pexels-julius-silver-753325_gnne5q.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611500178/pexels-baskin-creative-studios-1766838_au2rj4.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611500178/pexels-baskin-creative-studios-1766838_au2rj4.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611500178/pexels-baskin-creative-studios-1766838_au2rj4.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611500175/pexels-fabian-reitmeier-707915_xjs29p.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611500175/pexels-fabian-reitmeier-707915_xjs29p.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611500175/pexels-fabian-reitmeier-707915_xjs29p.jpg' },
   
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610814691/pexels-asad-photo-maldives-3601425_h5x2md.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712052/pexels-pixabay-461940_znnsxj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712052/pexels-pixabay-461940_znnsxj.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712052/pexels-pixabay-461940_znnsxj.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063807/pexels-pixabay-33545_zzzi4o.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063807/pexels-pixabay-33545_zzzi4o.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063807/pexels-pixabay-33545_zzzi4o.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611328466/pexels-asad-photo-maldives-1024967_pnt6jt.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611328467/pexels-fabian-wiktor-994605_vi6pck.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063800/pexels-steve-397857_n8hqga.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063800/pexels-steve-397857_n8hqga.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063800/pexels-steve-397857_n8hqga.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063805/pexels-roberto-shumski-1903702_vtanbj.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063805/pexels-roberto-shumski-1903702_vtanbj', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063805/pexels-roberto-shumski-1903702_vtanbj' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712046/pexels-pixabay-2150_mujmra.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712046/pexels-pixabay-2150_mujmra.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712046/pexels-pixabay-2150_mujmra.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1611063801/pexels-pixabay-302769_elwsut.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1611063801/pexels-pixabay-302769_elwsut.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1611063801/pexels-pixabay-302769_elwsut.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712052/pexels-rakicevic-nenad-769525_axqkwd.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712052/pexels-rakicevic-nenad-769525_axqkwd.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712052/pexels-rakicevic-nenad-769525_axqkwd.jpg' },
    { imgUrlLarge: 'https://res.cloudinary.com/basimgs/image/upload/w_1500/v1610712045/pexels-roberto-nickson-2559941_cguwhp.jpg', imgUrlmedium: 'https://res.cloudinary.com/basimgs/image/upload/w_400/v1610712045/pexels-roberto-nickson-2559941_cguwhp.jpg', imgUrlSmall: 'https://res.cloudinary.com/basimgs/image/upload/w_150/v1610712045/pexels-roberto-nickson-2559941_cguwhp.jpg' }
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
        {this.photos().map((photo, idx) => { return <div key={idx} className="menu-img-box"><img onClick={() => this.useImgForBgc(photo.imgUrlLarge, photo.imgUrlmedium)} className="board-photos-img" src={photo.imgUrlSmall} alt="not good" /></div> })}
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
