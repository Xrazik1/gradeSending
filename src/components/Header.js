import React from 'react';

const Header = ({ name }) => {
    return (
        <header>
            <span className="exit">Выйти</span>
            <span className="userName">Здравствуйте, {name}!</span>
        </header>
    );
};

export default Header;