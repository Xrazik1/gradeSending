import React from 'react';
import LoadForm from './LoadForm.js';
import AuthForm from './Login.js';
import Zoom from 'react-reveal/Zoom';
import HeadShake from 'react-reveal/HeadShake';

class Content extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            showLoadTable: this.props.showLoadTable,
            showAuthForm: this.props.showAuthForm,
            authError: false
        }
    }

    onAuthError = () => {
        this.setState({ 
            authError: true
          });
        
        setTimeout(
            () => {
                this.setState({ 
                    authError: false
                });
            },
            900
        );
    }
    

    render = () => { 

        return (
            <content>
                <Zoom when={this.props.showAuthForm} unmountOnExit={ true }>
                    <HeadShake when={this.state.authError}>
                        <AuthForm onSuccessAuth = { () => { this.props.onSuccessAuth() } } onAuthError={ this.onAuthError.bind(this) }></AuthForm>
                    </HeadShake>
                </Zoom>
                <Zoom when={this.props.showLoadTable} unmountOnExit={ true }>
                    <LoadForm></LoadForm>
                </Zoom>
            </content>
        )
        
    }
}





export default Content;