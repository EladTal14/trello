import React, { Component } from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { Polar, Doughnut, Bar } from 'react-chartjs-2'
import { loadBoard } from '../store/actions/boardAction.js'
import { loadUsers } from '../store/actions/userAction.js'
import { utilService } from '../services/utilService.js'
import Loader from 'react-loader-spinner'

export class _DashBoard extends Component {
  state = {
    board: null
  }
  componentDidMount() {
    const board = this.props.board
    if (!board) {
      let boardId = this.props.match.params.boardId
      loadBoard(boardId)
      this.setState({ board: this.props.board })
    }
    this.setState({ board: this.props.board })

  }
  loadBoard = async (boardId) => {
    await this.props.loadBoard(boardId)
  }

  showTaskPerGroup = () => {
    console.log(this.state.board.groups);
    const mapGroup = this.state.board.groups.reduce((acc, group) => {
      acc[group.title] = group.cards.length
      return acc
    }, {})
    return {
      labels:
        Object.keys(mapGroup).map(title => title),
      datasets: [{
        data: Object.values(mapGroup).map(title => title),
        backgroundColor: [
          ...Object.keys(mapGroup).map(() => utilService.getRandomColor())
        ],
        hoverBackgroundColor: [
          ...Object.keys(mapGroup).map(() => '#FFFFFF')
        ]
      }]
    };
  }

  showTaskPerLabel = () => {
    const mapLabels = this.state.board.groups.reduce((acc, group) => {
      group.cards.forEach(card => {
        card.labels.forEach(label => {
          if (!acc[label.title]) acc[label.title] = 1
          else acc[label.title] += 1
        })

      })
      return acc
    }, {})
    console.log(mapLabels);
    return {
      labels:
        Object.keys(mapLabels).map(title => title),
      datasets: [{
        data: Object.values(mapLabels).map(title => title),
        backgroundColor: [
          ...Object.keys(mapLabels).map(() => utilService.getRandomColor())

        ],
        hoverBackgroundColor: [
          ...Object.keys(mapLabels).map(() => '#FFFFFF')
        ]
      }]
    };
  }

  showTotalCards = () => {
    let cardNum = 0
    let cardUnassignedNum = 0
    this.state.board.groups.forEach(group => {
      group.cards.forEach(card => {
        if (card.members?.length > 0) {
          cardUnassignedNum++
        }
        cardNum++
      })
    })
    cardUnassignedNum = cardNum - cardUnassignedNum
    return { cardNum, cardUnassignedNum }
  }

  showStatistics = () => {
    const { members } = this.state.board
    const mapObj = members.reduce((acc, member) => {
      if (!acc[member.fullname]) acc[member.fullname] = 1
      else acc[member.fullname] += 1
      return acc
    }, {})

    return {
      labels:
        Object.keys(mapObj).map(fullname => fullname),
      datasets: [{
        data: Object.values(mapObj).map(fullname => fullname),
        backgroundColor: [
          ...Object.keys(mapObj).map(() => utilService.getRandomColor())
        ],
        hoverBackgroundColor: [
          ...Object.keys(mapObj).map(() => '#FFFFFF')
        ]
      }]
    };
  }

  render() {
    if (!this.state.board) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={400} width={400} timeout={3000} /></div>
    return (
      <div>
        <h1>Hello Statisctis</h1>
        <header className="dashboard-header flex">
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardNum}</span> <span> TOTAL CARDS</span></div>
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardUnassignedNum}</span> <span> UNASSIGNED CARDS</span></div>
          <div className="dashboard-preview flex column"><span>0</span> <span> ADDED TODAY</span></div>
        </header>
        <div className="dashboard-content flex" style={{ height: '600px', width: '600px', flexWrap: 'wrap' }}>
          {/* <Polar className="test" data={this.showStatistics()} /> */}
          <Bar className="test" data={this.showTaskPerGroup()} />
          <Doughnut className="test" data={this.showTaskPerLabel()} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  board: state.boardModule.currBoard,
  users: state.userModule.users
})

const mapDispatchToProps = {
  loadUsers,
  loadBoard
}

export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoard)
