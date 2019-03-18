import React from 'react';
import JsonTable from 'ts-react-json-table';


class GradesTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableJsonData : this.props.tableJsonData
        }
    }

    onBack = () => {
        this.props.showLoadForm();
    }

    render = () => {
        
        let backBtn = <span className="backBtn" onClick={ () => this.onBack() }>Назад</span>
        let sendBtn = <span className="sendBtn" >Отправить</span>

        return (
            <div className="GradesTableContainer">
                <div className="navBtns">
                    { backBtn }
                    { sendBtn }
                </div>

                <JsonTable rows = {this.state.tableJsonData} />
            </div>
        );
    }
}


export default GradesTable;