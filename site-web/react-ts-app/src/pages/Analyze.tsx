import BarreLaterale from "../components/BarreLaterale";
import Chart from "../components/Chart";

import Navigation from "../components/Navigation";

const Analyze = () =>  {
    return (
        <div className="Analyze">
            <div className="view">
                <h1 className="title">Analyze page</h1>
                
                <Chart  type='bar' 
                        labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
                        label= '# of Votes'
                        data= {[12, 19, 3, 5, 2, 3]}
                        backgroundColor= {['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)' ]}
                        borderColor= {['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)']}
                        />
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Analyze;