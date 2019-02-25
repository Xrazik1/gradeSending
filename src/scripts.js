import {excel2json} from 'js2excel';
import {NotificationContainer, NotificationManager} from 'react-notifications';

let XLSXHandler = function(table){
    let fileName = table[0].name;
    
    let fileExtension = (fileName.split('.'))[1];

    if (fileExtension == "xls" || fileExtension == "xlsx"){

        excel2json(table, (data) => {
            console.log('json', data)
        });        
        
    }else{
        throw new Error("Расширение не поддерживается");
    }



}

export default XLSXHandler;