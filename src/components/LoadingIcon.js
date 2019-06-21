import React from 'react';


class LoadingIcon extends React.Component{
    constructor(props){
        super(props);

    }

    render = () => {
        let loader
        if(this.props.show){
            loader = 
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
            </div>
        }else{
            loader = <div className="loader"></div>
        }


        return (
            loader
        )};
}

export default LoadingIcon;