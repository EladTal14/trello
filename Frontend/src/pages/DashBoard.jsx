import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2'
import { loadBoard } from '../store/actions/boardAction.js'
import { loadUsers } from '../store/actions/userAction.js'
import { utilService } from '../services/utilService.js'

export class _DashBoard extends Component {
  state = {
    board: null
  }
  async componentDidMount() {
    const board = this.props.board
    if (!board) {
      let boardId = this.props.match.params.boardId
      await this.loadBoard(boardId)
      console.log(boardId);
      this.setState({ board: this.props.board }, () => console.log(this.state.board))
    }
    this.setState({ board: this.props.board })

  }

  loadBoard = async (boardId) => {
    await this.props.loadBoard(boardId)
  }

  showTaskPerGroup = () => {
    const mapGroup = this.state.board.groups.reduce((acc, group) => {
      acc[group.title] = group.cards.length
      return acc
    }, {})
    console.log(mapGroup);
    console.log(Object.keys(mapGroup).map(title => title));
    console.log(Object.values(mapGroup).map(title => title));
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
    return {
      labels:
        [...Object.keys(mapLabels).map(title => title)],
      datasets: [{
        data: [...Object.values(mapLabels).map(title => title)],
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

  render() {
    if (!this.state.board) return <div>Loading...</div>
    return (
      <div className="statistics-page">
        <h1>Hello Statisctis</h1>
        <header className="dashboard-header flex">
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardNum}</span> <span> TOTAL CARDS</span></div>
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardUnassignedNum}</span> <span> UNASSIGNED CARDS</span></div>
          <div className="dashboard-preview flex column"><span>0</span> <span> ADDED TODAY</span></div>
        </header>
        <div className="dashboard-content flex" style={{ margin: '0 auto', height: '600px', width: '600px', flexWrap: 'wrap' }}>
          {/* <Polar className="test" data={this.showStatistics()} /> */}
          <Bar options={{
            scales: {
              yAxes: [{
                stacked: true,
                gridLines: {
                  display: true,
                  color: "rgba(255,255,255,0.8)"
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            },
            title: {
              display: true,
              text: 'Task Per Group',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            },
            labels: {
              fontColor: 'rgb(0, 0, 0)'
            }
          }} className="test" data={this.showTaskPerGroup()} />
          <Doughnut options={{
            scales: {
              yAxes: [{
                stacked: true,
                gridLines: {
                  display: true,
                  color: "rgba(255,255,255,0.8)"
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false
                }
              }]
            },
            title: {
              display: true,
              text: 'Task Per Label',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'right'
            }
          }} className="test" data={this.showTaskPerLabel()} />
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
