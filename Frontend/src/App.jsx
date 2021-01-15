import { connect } from 'react-redux'
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { BoardApp } from './pages/BoardApp';
import { Switch, Route } from 'react-router-dom';
import { saveBoard } from './store/actions/boardAction'

export function _App({ currBoard }) {
  return (
    <div className="App" style={{ backgroundImage: `url(${(currBoard) ? currBoard.style.backgroundImage : ''})` }}>
      <AppHeader />
      <Switch>
        <Route component={BoardApp} path="/board/:boardId" />
        <Route component={Boards} path="/boards" />
        <Route component={Home} path="/" />
      </Switch>
      {/* <AppFooter /> */}
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


