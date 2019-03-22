import React, { Component } from 'react';
import Header from './components/Header.js';
import Content from './components/Content.js';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './assets/App.scss';

class App extends Component {
  constructor(){
    super();

    this.state = {
      
      greetingVisibility: false,
      exitBtnVisibility: false,
      authFormVisibility: true,
      loadTableVisibility: false,
      gradesTableVisibility: false,
    }
  }

  showLoadForm (){
    this.setState({ 
      greetingVisibility: true, 
      exitBtnVisibility: true, 
      authFormVisibility: false,
      loadTableVisibility: true,
      gradesTableVisibility: false,
    });
    this.render();

  }

  showGradesTable(){
    this.setState({ 
      gradesTableVisibility: true,
      loadTableVisibility: false
    });

    this.render();
  }

  showAuthForm () {
    this.setState({ 
      greetingVisibility: false, 
      exitBtnVisibility: false, 
      authFormVisibility: true,
      loadTableVisibility: false,
      gradesTableVisibility: false
    });
    this.render();


  }

  render() {
    return (
      <div className="App">
        <NotificationContainer />
        <Header name="Елена" 
                greetingVisibility = { this.state.greetingVisibility } 
                exitBtnVisibility = { this.state.exitBtnVisibility } 
                showAuthForm = { this.showAuthForm.bind(this) }></Header>

        <Content type={ this.state.content } 
                showLoadForm = { this.showLoadForm.bind(this) }
                showGradesTable = { this.showGradesTable.bind(this) }
                authFormVisibility={ this.state.authFormVisibility }
                loadTableVisibility = { this.state.loadTableVisibility }
                gradesTableVisibility = { this.state.gradesTableVisibility }
                  >  
        </Content>


        <div className="clear"></div>
        <footer>
          <div className="rights">
            © 2018 All rights reserved
          </div>
          <div className="author">
            Production and development by <a href="https://vk.com/id173283033">Nikolay Savelev</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
