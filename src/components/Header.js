import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Header extends React.Component{
    constructor(props){
        super(props);

    }

    onExit = () => {

        this.props.showAuthForm();
        NotificationManager.info('Произведён выход из аккаунта');
    }

    render = () => {
        let greeting;
        let exitBtn;

        if(this.props.greetingVisibility){
            greeting = <span className="userName">Здравствуйте, {this.props.name}!</span>
        }

        if(this.props.exitBtnVisibility){
           exitBtn =  <span className="exitBtn" onClick={ () => this.onExit() }>Выйти</span>
        }

        return (
            <header>
                { exitBtn }
                { greeting }
            </header>
        )};
}

export default Header;