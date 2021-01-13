import React from 'react';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { BoardApp } from './pages/BoardApp';
import { Switch, Route } from 'react-router-dom';



export function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
<<<<<<< HEAD
          <Route component={BoardApp} path="/board" />
=======
          <Route component={CardEdit} path="/board/edit/:cardId" />
          <Route component={BoardApp} path="/board/:boardId" />
>>>>>>> 3aee3ca8aad867683223f1b0398a23cb3995df2c
          <Route component={Boards} path="/boards" />
          <Route component={Home} path="/" />
        </Switch>
      <AppFooter />
    </div>
  );
}


