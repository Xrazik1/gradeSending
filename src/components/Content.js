import React from 'react';
import LoadForm from './LoadForm.js';
import AuthForm from './Login.js';
import Zoom from 'react-reveal/Zoom';
import HeadShake from 'react-reveal/HeadShake';
import GradesTable from './GradesTable.js';

class Content extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            loadTableVisibility: this.props.loadTableVisibility,
            authFormVisibility: this.props.authFormVisibility,
            gradesTableVisibility: this.props.gradesTableVisibility,
            tableJsonData: null,
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

    setJsonData = (data) => {
        this.setState({ tableJsonData: data })
        console.log(this.state.tableJsonData)
        this.render()
        
    }
    

    render = () => { 

        return (
            <content>
                <Zoom when={this.props.authFormVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true }>
                    <HeadShake when={this.state.authError}>
                        <AuthForm showLoadForm = { () => { this.props.showLoadForm() } } 
                                  onAuthError={ this.onAuthError.bind(this) } ></AuthForm>
                    </HeadShake>
                </Zoom>
                <Zoom when={this.props.loadTableVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true }>
                    <LoadForm loadTableVisibility={ this.props.loadTableVisibility } 
                              gradesTableVisibility={ this.state.gradesTableVisibility } 
                              showGradesTable = { () => this.props.showGradesTable() }
                              setJsonData={ this.setJsonData.bind(this) }
                              ></LoadForm>
                </Zoom>
                <Zoom when={this.props.gradesTableVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true } >
                    <GradesTable tableJsonData = { this.state.tableJsonData }></GradesTable>
                </Zoom>
            </content>
        )
        
    }
}





export default Content;