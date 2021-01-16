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
      <div className="change-bgc flex space-between">
        <div className="change-bgc-back"><button onClick={onChangeBackground}>back</button></div>
        {!bgcFrom && <div><button onClick={() => this.chooseBgcFrom('Photos')}>Photos</button>
          <button onClick={() => this.chooseBgcFrom('Colors')}>Colors</button></div>}
        {bgcFrom === 'Photos' && <BoardPhotos toggleMenu={toggleMenu} />}
        {bgcFrom === 'Colors' && <BoardColors toggleMenu={toggleMenu} />}

      </div>
    )
  }
}

