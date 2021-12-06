import Navigation from "../components/Navigation";
import BarreLaterale from "../components/BarreLaterale";
const Home = () =>  {
    
    return (
        
        <div className="home">
            
            <div id="view" className="view">
                <h1 className="title">Home page</h1>
                        
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Home;