import React from 'react';
import LoadForm from './LoadForm.js';
import AuthForm from './Login.js';
import Zoom from 'react-reveal/Zoom';
import HeadShake from 'react-reveal/HeadShake';
import GradesTable from './GradesTable.js';
import Instruction from './Instruction';

class Content extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            loadTableVisibility: this.props.loadTableVisibility,
            authFormVisibility: this.props.authFormVisibility,
            gradesTableVisibility: this.props.gradesTableVisibility,
            instructionsVisibility : false,
            jsonTables: [],
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

        this.setState({ jsonTables: data })
        this.render()
    }


    toggleInstructions = () => {
        this.setState({ "instructionsVisibility" : !this.state.instructionsVisibility })
    }



    render = () => { 
        
        return (
            <content>
                <Zoom when={this.props.authFormVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true }>
                    <HeadShake when={this.state.authError}>
                        <AuthForm showLoadForm = { () => { this.props.showLoadForm() } } 
                                  onAuthError={ this.onAuthError.bind(this) } 
                                  loadingIcon = { this.props.loadingIcon }>
                        </AuthForm>
                    </HeadShake>
                </Zoom>
                <Zoom  
                      when={this.props.loadTableVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true }>
                    <LoadForm loadTableVisibility={ this.props.loadTableVisibility } 
                              gradesTableVisibility={ this.state.gradesTableVisibility } 
                              showGradesTable = { () => this.props.showGradesTable() }
                              setJsonData={ this.setJsonData.bind(this) }
                              loadingIcon = { this.props.loadingIcon }
                              >
                    </LoadForm>
                    <Instruction 
                        toggleInstructions = { this.toggleInstructions } 
                        instructionsVisibility = { this.state.instructionsVisibility }>
                    </Instruction>
                </Zoom>
                <Zoom when={this.props.gradesTableVisibility} 
                      unmountOnExit={ true } 
                      mountOnEnter = { true } >
                    <GradesTable jsonTables = { this.state.jsonTables } 
                                 showLoadForm = { () => { this.props.showLoadForm() } }
                                 loadingIcon = { this.props.loadingIcon }>

                    </GradesTable>
                </Zoom>
            </content>
        )
        
    }
}





export default Content;