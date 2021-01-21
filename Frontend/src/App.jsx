import { connect } from 'react-redux'
import { AppHeader } from './cmps/AppHeader'
import { Home } from './pages/Home'
import { Boards } from './pages/Boards'
import { BoardApp } from './pages/BoardApp'
import { Switch, Route } from 'react-router-dom'
import { saveBoard } from './store/actions/boardAction'
import { Login } from './pages/Login'
import { Login1 } from './pages/Login1'
import { Signup } from './pages/Signup'
import { DashBoard } from './pages/DashBoard'

export function _App({ currBoard }) {
  return (
    <div className="App" style={{ backgroundImage: `url(${(currBoard) ? currBoard.style.backgroundImage : 'white'})` }}>
      <AppHeader />
      <Switch>

        <Route component={Login1} path="/login1" />
        <Route component={Login} path="/login" />
        <Route component={Signup} path="/signup" />
        <Route component={DashBoard} path="/board/:boardId/dashboard" />
        <Route component={BoardApp} path="/board/:boardId" />
        <Route component={Boards} path="/boards" />
        <Route component={Home} path="/" />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currBoard: state.boardModule.currBoard
})

const mapDispatchToProps = {
  saveBoard,

}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)


