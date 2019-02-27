import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);

    }


    render = () => {
        let greeting;
        let exitBtn;

        if(this.props.greetingVisibility){
            greeting = <span className="userName">Здравствуйте, {this.props.name}!</span>
        }

        if(this.props.exitBtnVisibility){
           exitBtn =  <span className="exitBtn" onClick={ () => this.props.onExit() }>Выйти</span>
        }

        return (
            <header>
                { exitBtn }
                { greeting }
            </header>
        )};
}

export default Header;