import React, { Component } from 'react';
import Header from './components/Header.js';
import Content from './components/Content.js';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NotificationContainer/>
        <Header name="Елена"></Header>
        <Content type="loadTable"></Content>
        <div className="clear"></div>
        <footer>
          <div className="rights">
            © 2018 All rights reserved
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
