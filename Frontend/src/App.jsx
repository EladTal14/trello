import React from 'react';
import { AppFooter } from './cmps/AppFooter';
import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { BoardApp } from './pages/BoardApp';
import { CardEdit } from './cmps/CardEdit.jsx'
import { Switch, Route } from 'react-router-dom';



export function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
          <Route component={CardEdit} path="/board/edit/:cardId" />
          <Route component={BoardApp} path="/board/:boardId" />
          <Route component={Boards} path="/boards" />
          <Route component={Home} path="/" />
        </Switch>
      <AppFooter />
    </div>
  );
}


