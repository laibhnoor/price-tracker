import React from 'react';

const ThemeToggler = ({ toggleTheme }) => {
    return (
        <button className="theme-toggler" onClick={toggleTheme}></button>
    );
};

export default ThemeToggler;