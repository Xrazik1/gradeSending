import React from 'react';
import JsonTable from 'ts-react-json-table';

import axios from 'axios';
import os from 'os';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class GradesTable extends React.Component{
    constructor(props){
        super(props);

        

        this.state = {
            tableJsonData: this.props.jsonTables[0],
            tableJsonDataShort: this.props.jsonTables[1]
        }
    }

    componentDidMount = () => {
        this.props.loadingIcon().hide()
    }


    onBack = () => {
        this.props.showLoadForm();
    }



    onSubmitGrades = () => {

        let grades = this.state.tableJsonData;
        console.log(grades)

        for (let student in grades){
            let email = "";
            let name = "";
            let letterText = ``;
  
            for (let row in grades[student]){

                if(row == "ФИО"){
                    name = grades[student][row];                    
                }else if(row == "Почта" || row == "почта" || row == "Email" || row == "email"){
                    
                    email = grades[student][row];
                }else{
                    letterText += `${row}: ${grades[student][row]} <br />`;
                }
            }

            if ( email == "" ) {
                NotificationManager.error('Вы пропустили почту в одной из строк');
                return;
            }
            else if ( name == "" ) {
                NotificationManager.error('Вы пропустили фио студента в одной из строк');
                return;
            }else{
                axios({
                    method: 'post',
                    url: `http://${os.hostname()}:3007/sendMail`,
                    data: {
                        email: email,
                        name: name,
                        letter: letterText
                    }
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error);
                });
            }           
        }
        NotificationManager.success('Оценки успешно разосланы');
        this.onBack();

    }

    render = () => {
        
        let backBtn = <span className="backBtn" onClick={ () => this.onBack() }>Назад</span>
        let sendBtn = <span className="sendBtn" onClick={ () => this.onSubmitGrades() } >Отправить</span>

        return (
            <div className="GradesTableContainer">
                <div className="navBtns">
                    { backBtn }
                    { sendBtn }
                </div>

                <JsonTable rows = {this.state.tableJsonDataShort } />
            </div>
        );
    }
}


export default GradesTable;