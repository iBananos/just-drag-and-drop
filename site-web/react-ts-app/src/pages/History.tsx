import BarreLaterale from "../components/BarreLaterale";
import HistoryCell from "../components/HistoryCell";
import Navigation from "../components/Navigation";
import ViewHistory from "../components/ViewHistory";

const History = () =>  {
    return (
        
        <div className="History">
            
            <div className="viewHistory">
                <h1 className="title">History page</h1>
                <HistoryCell name="LE NOMfdsfdsfdsqfdsqfsdqfsdfdsqfds" date=" AVANT HIERfsfsfsqfsqfsqfqs" nomBase="BASE 1fsfsqfsqfsdqfsqfsdfsq"/>
                <HistoryCell name="Bonjour" date=" demain" nomBase="BASE 2"/>
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
                <HistoryCell />
            </div>
            <ViewHistory />
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default History;