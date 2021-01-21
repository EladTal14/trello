import { Component } from 'react'
import { BoardColors } from './BoardColors.jsx'
import { BoardPhotos } from './BoardPhotos.jsx'

export class ChangeBackground extends Component {
  state = {
    bgcFrom: null
  }
  chooseBgcFrom = (from) => {
    this.setState({ bgcFrom: from })
  }
  render() {
    const { onChangeBackground, toggleMenu } = this.props
    const { bgcFrom } = this.state
    return (
      <>
        <div className="change-bgc-back"><button onClick={onChangeBackground}>back</button></div>
        <div className="change-bgc flex justify-center">
          {/* <div className="change-bgc flex space-between"> */}
          {!bgcFrom &&
            <div className="flex align-center">
              <div className="flex column align-center"><div onClick={() => this.chooseBgcFrom('Photos')} className="photos-btn" ></div>
                <span>Photos</span>
              </div>
              <div className="flex column align-center">
                <div onClick={() => this.chooseBgcFrom('Colors')} className="colors-menu-btn"></div>
                <span>Colors</span></div>
            </div>}
          {bgcFrom === 'Photos' && <BoardPhotos toggleMenu={toggleMenu} />}
          {bgcFrom === 'Colors' && <BoardColors toggleMenu={toggleMenu} />}

        </div>
      </>
    )
  }
}

