import { NavLink } from "react-router-dom";
import logo from './Logo.png';
const Navigation = () => {
    return (
        <div className="navigation">
            <img className="logo" src={logo} alt="JustDragAndDrop"/>
            <h1 className="company">Just Drag & Drop</h1>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/upload">Upload</NavLink></li>
                <li><NavLink to="/history">History</NavLink></li>
                <li><NavLink to="/analyze">Analyze</NavLink></li>
                <li><NavLink to="/Login">Log in</NavLink></li>
            </ul>

        </div>
        
    );
};

export default Navigation;