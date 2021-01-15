import { Component } from 'react'
// import { BoardColors } from './BoardHeader/BoardColors.jsx'
// import { BoardPhotos } from './BoardHeader/BoardPhotos.jsx'

export class ChangeBackground extends Component {
  state = {
    bgcFrom: null
  }
  chooseBgcFrom = (from) => {
    this.setState({ bgcFrom: from })
  }
  render() {
    const { onChangeBackground } = this.props
    const { bgcFrom } = this.state
    return (
      <div className="change-bgc flex space-between">
        <button onClick={onChangeBackground}>back</button>
        {!bgcFrom && <div><button onClick={() => this.chooseBgcFrom('Photos')}>Photos</button>
          <button onClick={() => this.chooseBgcFrom('Colors')}>Colors</button></div>}
        {/* {bgcFrom === 'Photos' && <BoardPhotos />} */}
        {/* {bgcFrom === 'Colors' && <BoardColors />} */}

      </div>
    )
  }
}

