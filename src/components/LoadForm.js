import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {excel2json} from 'js2excel';
import os from "os";


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

    onSuccessLoad = () => {
        NotificationManager.success('Файл успешно загружен');

        this.props.showGradesTable();
    }

    onServerError = () => {
        NotificationManager.error('Ошибка при загрузке файла на сервер (404)');
    }

    onServerSuccess = () => {
        console.log("Файл успешно загружен")
    }

    onFileInit = (error, file) => {
        if (error){
            NotificationManager.error(error, 'Click me!', 5000, () => {});
        }else{
            NotificationManager.info('Файл начал загрузку');
            try{
                this.XLSXHandler(this.state.files);
            }catch(error){
                NotificationManager.error(error.message, 'Click me!', 5000, () => {});
                this.pond.removeFiles();
            }
            this.pond.processFiles();
        }
    }

    XLSXHandler = (table) => {
        let fileName = table[0].name;
        
        let fileExtension = (fileName.split('.'))[1];
    
        if (fileExtension == "xls" || fileExtension == "xlsx"){
    
            excel2json(table, (data) => {
                let keys = Object.keys(data);
                this.props.setJsonData(data[keys[0]]);
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

