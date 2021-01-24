import React, { Component } from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { Polar, Doughnut, Bar, Line, Bubble, Radar } from 'react-chartjs-2'
import { loadBoard } from '../store/actions/boardAction.js'
import { loadUsers } from '../store/actions/userAction.js'
import { utilService } from '../services/utilService.js'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export class _DashBoard extends Component {
  state = {
    board: null,
    textSize: 25
  }
  updateTextSize = () => {
    if (window.innerWidth < 500) {
      this.setState({ textSize: 15 });
    }
    else if (window.innerWidth === 501) {
      this.setState({ textSize: 25 });
    }
  }
  async componentDidMount() {
    // window.addEventListener('resize', this.updateTextSize)
    const board = this.props.board
    if (!board) {
      let boardId = this.props.match.params.boardId
      await this.loadBoard(boardId)
      this.setState({ board: this.props.board })
    }
    this.setState({ board: this.props.board })

  }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateTextSize);
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log(1);
  //   if (window.innerWidth < 400) this.setState({ textSize: 15 })

  // }


  loadBoard = async (boardId) => {
    await this.props.loadBoard(boardId)
  }

  showTaskPerGroup = () => {
    const mapGroup = this.state.board.groups.reduce((acc, group) => {
      acc[group.title] = group.cards.length
      return acc
    }, {})
    // console.log(mapGroup);
    console.log(Object.keys(mapGroup));
    // console.log(Object.values(mapGroup).map(title => title));
    return {
      labels:
        [...Object.keys(mapGroup)],
      datasets: [{
        data: [...Object.values(mapGroup).map(title => title)],
        backgroundColor: [
          ...Object.keys(mapGroup).map((key, index) => {
            if (index % 2 === 0)
              return utilService.getRandomBrightColor()
            else return utilService.getRandomDarkColor()
          })
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
          ...Object.keys(mapLabels).map((key, index) => {
            if (index % 2 === 0)
              return utilService.getRandomBrightColor()
            else return utilService.getRandomDarkColor()
          })

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
    if (!this.state.board) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>
    const { textSize } = this.state
    return (

      <div className="statistics-page flex column" style={{ background: "linear-gradient(to right top, rgba(39, 61, 93, 0.65098), rgba(177, 106, 97, 0.501961))" }}>
        {/* <div className="statistics-page"> */}
        <h1>Statistics</h1>
        <header className="dashboard-header flex">
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardNum}</span> <span> TOTAL CARDS</span></div>
          <div className="dashboard-preview flex column"><span>{this.showTotalCards().cardUnassignedNum}</span> <span> UNASSIGNED CARDS</span></div>
          <div className="dashboard-preview flex column"><span>3</span> <span> ADDED TODAY</span></div>
        </header>
        <button><Link to={`board/${this.state.board._id}`}> Back</Link></button>
        <div className="dashboard-content flex" style={{
          height: "430px",
          width: "430px",
          flexWrap: "wrap",
          margin: "0 auto"
        }} >
          {/* <Polar className="test" data={this.showStatistics()} /> */}
          <Polar options={{
            responsive: true,
            scales: {
              yAxes: [{
                stacked: true,
                gridLines: {
                  display: true,
                  color: "rgba(0,0,0,0.8)"
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false,
                }
              }]
            },
            title: {
              display: true,
              text: 'Tasks Per List',
              fontSize: textSize,
              fontColor: 'rgb(0, 0, 0)'
            },
            legend: {
              display: true,
              position: 'right',
              labels: {
                fontColor: 'rgb(0, 0, 0)',
                fontSize: 0.66 * textSize
              }
            },
          }} className="test" data={this.showTaskPerGroup()} />
          <Doughnut options={{
            responsive: true,
            scales: {
              yAxes: [{
                stacked: true,
                gridLines: {
                  display: true,
                  color: "rgba(0,0,0,0.8)"
                }
              }],
              xAxes: [{
                gridLines: {
                  display: false,
                }
              }]
            },
            title: {
              display: true,
              text: 'Tasks Per Label',
              fontSize: textSize,
              fontColor: 'rgb(0, 0, 0)'
            },
            legend: {
              display: true,
              position: 'right',
              labels: {
                fontColor: 'rgb(0, 0, 0)',
                fontSize: 0.66 * textSize
              }
            }
          }} className="test" data={this.showTaskPerLabel()} />
        </div>
      </div >
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
