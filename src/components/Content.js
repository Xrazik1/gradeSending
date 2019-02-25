import React from 'react';
import LoadForm from './LoadForm.js';

const Content = ({ type }) => {
    switch(type){
        case "loadTable": 
            return (
                <content>
                    <LoadForm></LoadForm>
                </content>
            );
        case "authForm":
            return;
        default:
            return (
                <div>Не удалось загрузить компонент</div>
            )
    }

};

export default Content;