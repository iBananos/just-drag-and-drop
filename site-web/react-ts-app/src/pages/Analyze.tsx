import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";

const Analyze = () =>  {
    return (
        <div className="Analyze">
            <BarreLaterale />
            <Navigation />
            <div className="view">
                <h1 className="title">Analyze page</h1>
            </div>
        </div>
    )
}

export default Analyze;