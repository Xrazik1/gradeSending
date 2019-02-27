import React from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';



class AuthForm extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            password: ''
        }
    }

    getInitialState = () => {
        return { password: '' };
    }

    validateForm = () => {
        if(this.state.password == "0000"){
            this.props.onSuccessAuth();
        }else{
            NotificationManager.error("Вы ввели неверный пароль", 'Click me', 5000, () => {});

            this.props.onAuthError();
        }
    };

    handleChange= (e) => {
        this.setState({ password: e.target.value });
    }

    render = () => {
        return (
            <form className="AuthForm">

                <h1>Введите свой пароль для входа</h1>
                <input type="password" className="AuthFormPassword" onChange={ this.handleChange }></input>
                <input type="button" className="AuthFormSubmit" value="Войти" onClick={ this.validateForm  }></input>
            </form>
        );
    }

}

export default AuthForm;