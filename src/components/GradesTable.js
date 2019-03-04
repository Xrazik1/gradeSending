import React from 'react';
import JsonTable from 'ts-react-json-table';


class GradesTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tableJsonData : this.props.tableJsonData
        }
    }



    render = () => {
        
        return (
            <div className="GradesTableContainer">
                <JsonTable rows = {this.state.tableJsonData} />
            </div>
        );
    }
}


export default GradesTable;