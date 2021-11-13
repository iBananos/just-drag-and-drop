import React from 'react';
import {NavLink} from 'react-router-dom';
const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/upload">
                Upload
            </NavLink>
            <NavLink to="/history">
                History
            </NavLink>
            <NavLink to="/analyze">
                Analyze
            </NavLink>
            
        </div>
    );
};

export default Navigation;