import React from 'react';
import Zoom from 'react-reveal/Zoom';

class Instruction extends React.Component{
    constructor(props){
        super(props);

    }



    render = () => {
        let instructions;

            instructions =  
                <Zoom cascade top
                      when={this.props.instructionsVisibility}
                      unmountOnExit={ true } 
                      mountOnEnter = { true }
>                       
                      
                    <div className = "instructions">
                        <ul>
                            <li>1. Принимаются таблицы форматов .xls, .xslx</li>
                            <li>2. Почта, на которую должны отправляться оценки студента, должна находиться в последнем столбце таблицы.</li>
                            <li>3. При наличии в файле таблицы нескольких листов, будет загружен самый первый лист.</li>
                            <li>4. Гарантируется исправная работа программы только при устойчивом подключении к интернету</li>
                            <li>5. Нарушение структуры таблицы, представленной ниже, может привести к критическим ошибкам, нарушать её крайне не рекомендуется</li>
                        </ul>
                        <div className="tableExample">
                            <h1>Пример загружаемой таблицы</h1>
                            <img src="tableExample.jpg" className="tableExampleImg"></img>
                        </div>


                        <h2>По всем вопросам обращайтесь в телеграм <a href="http://tele.gg/mikolasav">@mikolasav</a></h2>
                    </div>
                </Zoom>


        
        return (

            <div>
                <h1 className="instructionsHeader" onClick={ () => this.props.toggleInstructions() }>Ознакомьтесь с правилами перед использованием</h1>
                { instructions }
            </div>
        )};
}

export default Instruction;