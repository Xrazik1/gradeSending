import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import XLSXHandler from "../scripts.js";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class LoadForm extends React.Component{
    constructor(props){
        super(props);
        
        this.serverConfig ={
           url:"http://localhost:3007",
           process:{
               url: '/tables',
               method: "POST",
               withCredentials: false,
               headers: {},
               timeout: 7000,
               onload: null,
               onerror: null,
               ondata: null
           }
        }
        this.state = {
            // Set initial files, type 'local' means this is a file
            // that has already been uploaded to the server (see docs)
        };
    }

    onServerError = () => {
        console.log("Возникла ошибка при загрузке файла")
    }

    onServerSuccess = () => {
        console.log("Файл успешно загружен")
    }

    handleInit = (error, file) => {
        if (error){
            NotificationManager.error(error, 'Click me!', 5000, () => {});
        }else{
            NotificationManager.info('Файл начал загрузку');
            try{
                XLSXHandler(this.state.files);
            }catch(error){
                NotificationManager.error(error.message, 'Click me!', 5000, () => {});
                this.pond.removeFiles();
            }
            this.pond.processFiles();
        }
    }
    render = () => {
        return (
            <div className="sendFormContainer">
                <FilePond ref={ref => this.pond = ref}
                          labelIdle="Кликните или перетащите таблицу"
                          files={this.state.files}
                          server={ this.serverConfig }
                          onprocessfile={ () => NotificationManager.success('Файл успешно загружен') }
                          onaddfile={(error, file) => this.handleInit(error, file) }
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

