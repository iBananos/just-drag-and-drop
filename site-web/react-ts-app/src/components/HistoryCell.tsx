import Navigation from "./Navigation";

interface propsHistory {
    name? : string ;
    date? : string ;
    nomBase? : string ;
    id? : string;
}


const HistoryCell = (props : propsHistory) => {
    function askForView(){
        console.log("click ! ");
        var title = (document.getElementById("title")as HTMLInputElement);
        var date = (document.getElementById("date")as HTMLInputElement);
        var database = (document.getElementById("database")as HTMLInputElement);
        if(props.name === undefined){
            title.innerHTML = "";
            date.innerHTML = "";
            database.innerHTML = "";
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="none";
        }else{
            title.innerHTML = "Title : " +props.name as string;
            date.innerHTML = "Date : " +props.date as string;
            database.innerHTML = "Database : "+props.nomBase as string;
            (document.getElementById("loadButton")as HTMLInputElement).style.display ="block";
        }
        

    }

    return (
        <div className="HistoryCell" onClick={askForView}>
            <p className="title">{props?.name}</p>
        </div>
    )

};

export default HistoryCell;