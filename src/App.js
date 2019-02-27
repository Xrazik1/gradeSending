import React, { Component } from 'react';
import Header from './components/Header.js';
import Content from './components/Content.js';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './App.scss';

class App extends Component {
  constructor(){
    super();

    this.state = {
      
      greetingVisibility: false,
      exitBtnVisibility: false,
      showAuthForm: true,
      showLoadTable: false
    }
  }

  onSuccessAuth (){
    this.setState({ 
      greetingVisibility: true, 
      exitBtnVisibility: true, 
      showAuthForm: false,
      showLoadTable: true
    });
    this.render()
    NotificationManager.success("Вы успешно авторизовались");

  }

  onExit () {
    this.setState({ 
      greetingVisibility: false, 
      exitBtnVisibility: false, 
      showAuthForm: true,
      showLoadTable: false
    });
    this.render()
    NotificationManager.info('Произведён выход из аккаунта');

  }

  render() {
    return (
      <div className="App">
        <NotificationContainer />
        <Header name="Елена" 
                greetingVisibility = { this.state.greetingVisibility } 
                exitBtnVisibility = { this.state.exitBtnVisibility } 
                onExit = { this.onExit.bind(this) }></Header>

        <Content type={ this.state.content } 
                onSuccessAuth = { this.onSuccessAuth.bind(this) }
                showAuthForm={ this.state.showAuthForm }
                showLoadTable = { this.state.showLoadTable }
                  >  
        </Content>





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
