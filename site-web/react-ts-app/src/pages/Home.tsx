import Navigation from "../components/Navigation";
import React from "react" 
import BarreLaterale from "../components/BarreLaterale";
const Home = () =>  {
    return (
        
        <div className="home">
            <BarreLaterale />
            <Navigation />
            <div className="view">
                <h1 className="title">Home page</h1>
            </div>
        </div>
    )
}

export default Home;