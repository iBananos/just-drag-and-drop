import React from 'react';
import {NavLink} from 'react-router-dom';
import add from "../assets/add.svg";
const BarreLaterale = () => {
    return (
        <div className="barreLaterale">
            
            <ul>
                <li><NavLink to="/upload"><img className="add1" src={add} alt="add a database" height="30px" width="30px"/>New Database</NavLink></li>
                <li><NavLink to="/analyze"><img className="add2" src={add} alt="new analyze" height="30px" width="30px"/>New Analyze</NavLink></li>
            </ul>
        </div>
    );
};

export default BarreLaterale;