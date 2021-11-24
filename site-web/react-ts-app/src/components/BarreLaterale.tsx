import React from 'react';
import {NavLink} from 'react-router-dom';
import add from "../assets/add.svg";
const BarreLaterale = () => {

    function gestionBarre(){
        var width = window.innerWidth;
        console.log(width)
        if(width > 750){
            (document.getElementById("barreLaterale") as HTMLElement).style.display = "block";
            (document.getElementById("view") as HTMLElement).style.marginLeft = "200px";
        }else{
            (document.getElementById("barreLaterale") as HTMLElement).style.display = "none";
            (document.getElementById("view") as HTMLElement).style.marginLeft = "0";
        }
    }
    window.addEventListener('resize', gestionBarre);
    return (
        <div id="barreLaterale" className="barreLaterale">
            <ul>
                <li><NavLink to="/upload"><img className="add1" src={add} alt="add a database" height="30px" width="30px"/>New Database</NavLink></li>
                <li><NavLink to="/analyze"><img className="add2" src={add} alt="new analyze" height="30px" width="30px"/>New Analyze</NavLink></li>
            </ul>
            </div>
    );
};

export default BarreLaterale;