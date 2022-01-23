import Navigation from "../components/Navigation";
import BarreLaterale from "../components/BarreLaterale";
import * as utils from "../Utils";
const Home = () =>  {
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        let status = params.get('status');
        if(status==="disconnected"){
            utils.default.doAlert("info","You have been disconnected !");
        }else if(status==="connected"){
            utils.default.doAlert("success","You are connected !");
        }
    }
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