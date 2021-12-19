import Navigation from "../components/Navigation";
import BarreLaterale from "../components/BarreLaterale";
import { NavLink } from "react-router-dom";
const Demo = () =>  {
    
    return (
        
        <div className="Demo">
            
            <div id="view" className="view">
                <h1 className="title">Demo page</h1>
                <div className="democontainer">
                <NavLink onClick={window.location.reload} to="/dataVisu?demo=true"><div className="democell"><p className="textDemo">Datavisualisation</p></div></NavLink>
                <NavLink onClick={window.location.reload} to="/analyze?demo=true"><div className="democell"><p className="textDemo">Predictions</p></div></NavLink>
                    </div>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Demo;