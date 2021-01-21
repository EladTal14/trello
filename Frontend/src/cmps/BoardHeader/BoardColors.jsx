import { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../../store/actions/boardAction.js'

class _BoardColors extends Component {
  bgColors = () => {

    return [{ imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731294/blue_icz7cd.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731552/yellow_acyunw.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731568/yellow2_gakpte.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731599/green-1_h78uob.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731662/green-2_ura9cy.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731705/red-1_mrdvf7.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731707/red-2_vo74ot.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731757/gray-1_rpkrjg.png' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731759/gray-2_shnjdu.jpg' },
    { imgUrl: 'https://res.cloudinary.com/dxh5keaol/image/upload/v1610731294/blue_icz7cd.jpg' },]
  }
  getImgForBgc = async (imgUrl) => {
    const { currBoard } = this.props
    currBoard.style.backgroundImage = imgUrl
    await this.props.saveBoard(currBoard)
    this.props.toggleMenu()
  }
  render() {
    return (
      <div className="board-colors flex justify-center">
        {this.bgColors().map((color, idx) => { return <div className="menu-img-box" key={idx} ><img  className="board-colors-grid" onClick={() => this.getImgForBgc(color.imgUrl)} src={color.imgUrl} alt="not good" /></div> })}
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

export const BoardColors = connect(mapStateToProps, mapDispatchToProps)(_BoardColors)
