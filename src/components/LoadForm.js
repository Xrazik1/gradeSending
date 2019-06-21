import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {excel2json} from 'js2excel';
import os from "os";
const _ = require('lodash');


class LoadForm extends React.Component{
    constructor(props){
        super(props);
        
        this.serverConfig ={
           url:`http://${os.hostname()}:3007`,
           process:{
               url: '/tables',
               method: "POST",
               withCredentials: false,
               headers: {},
               timeout: 7000,
               onload: this.onSuccessLoad,
               onerror: this.onServerError,
               ondata: null
           }
        }
        this.state = {
            tableData: null
        };
    }

    componentDidMount = () => {
        this.props.loadingIcon().hide()
    }


    onSuccessLoad = () => {

        this.props.showGradesTable();
    }

    onServerError = () => {
        NotificationManager.error('Ошибка при загрузке файла на сервер (404)');
    }


    onFileInit = (error, file) => {
        this.props.loadingIcon().show()
        if (error){
            this.props.loadingIcon().hide()
            NotificationManager.error(error, 'Error!', 5000, () => {});
        }else{
            try{
                this.XLSXHandler(this.state.files);
            }catch(error){
                this.props.loadingIcon().hide()
                NotificationManager.error(error.message, 'Error!', 5000, () => {});
                this.pond.removeFiles();
            }
            this.pond.processFiles();
        }
    }

    XLSXHandler = (table) => {
        let fileName = table[0].name;
        let fileExtension = (fileName.split('.'))[1];
        let emails = ["Почта", "почта", "Email", "email"]


        let shortKeys = function(obj)  {
            for (let prop in obj){
                for(let row in obj[prop]){
                    if ((row.length > 3) && !(emails.includes(row))) {
                        Object.defineProperty(obj[prop], row.substr(0,3),
                            Object.getOwnPropertyDescriptor(obj[prop], row));
                        delete obj[prop][row];
                    }
                }
            }

            return obj;
        }

        let trimObj = (obj) => {
            if (!Array.isArray(obj) && typeof obj != 'object') return obj;
            return Object.keys(obj).reduce((acc, key) => {
              acc[key.trim()] = typeof obj[key] == 'string'? obj[key].trim() : trimObj(obj[key]);
              return acc;
            }, Array.isArray(obj)? []:{});
        }
    

        if (fileExtension == "xls" || fileExtension == "xlsx"){
    
            excel2json(table, (data) => {
                let keys = Object.keys(data);
                data = data[keys[0]];
                data = trimObj(data);


                let empty = 0;

                for (let prop in data){
                    for(let row in data[prop]){
                        if(data[prop][row] == "" ){
                            empty += 1;
                        }
                    }
                    if(empty >= 2){
                        delete data[prop];
                    }else{
                        continue;
                    }
                }
                let shortTable = shortKeys(JSON.parse(JSON.stringify(data)))
                for (let key in shortTable){
                    if (shortTable[key] === null){
                        delete shortTable[key];
                    }
                }

            
                this.props.setJsonData([data, shortTable])

            });        
            
        }else{
            throw new Error("Расширение не поддерживается");
        }
    
    }

    render = () => {
        return (
            <div className="sendFormContainer">
                <FilePond ref={ref => this.pond = ref}
                          labelIdle="Кликните или перетащите таблицу"
                          files={this.state.files}
                          server={ this.serverConfig }
                          onaddfile={(error, file) => this.onFileInit(error, file) }
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}>
                </FilePond>
            </div>
        );
    }

}

export default LoadForm;

