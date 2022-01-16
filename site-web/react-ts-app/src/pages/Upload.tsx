import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";
import * as utils from "../Utils";

const Upload = () => { 
  let files : File;
  window.onload=function(){
    utils.default.sendRequestWithToken('POST', '/api/profile/isVerified', "", callback);
  var dropArea = (document.getElementById("drop-area") as HTMLInputElement)
  // Prevent default drag behaviors
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)
  })

  // Highlight drop area when item is dragged over it
  ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  })

  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })

  // Handle dropped files
  dropArea.addEventListener('drop', handleDrop, false)

function callback(){

}

function preventDefaults (e:Event) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e :Event) {
  dropArea?.classList.add('highlight')
}

function unhighlight(e:Event) {
  dropArea?.classList.remove('highlight')
}
}
function handleDrop(e:any) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}


function handleFiles(event :any) {
  if(event !== undefined){
    if(event[0] ===undefined){
      files = event.target.files[0];
    }else{
      files = event[0];
    }
    (document.getElementById('nameFile') as HTMLInputElement).innerHTML = files.name;
    (document.getElementById('inputName') as HTMLInputElement).value = files.name.split(".")[0];
    if(files.name.split(".")[1]==="csv"){
      (document.getElementById("separator") as HTMLSelectElement).disabled = false;
    }
  }
}
function sendFile(){
  var name = (document.getElementById('inputName') as HTMLInputElement);
  if(files){
    if(name.value !== ""){
      uploadFile(files)
      
    }else{
      utils.default.doAlert("warning","Please give the new database a name");

      
  }}else{
    utils.default.doAlert("warning","Please drop a database");
  }
}




function uploadFile(file:any) {
  var name = (document.getElementById('inputName') as HTMLInputElement).value;
  var date = new Date(Date.now());
  var separator = (document.getElementById("separator") as  HTMLSelectElement).value
  console.log('POST', '/api/upload', file, name, date,separator)
  utils.default.sendFileWithToken('POST', '/api/upload', file, name, date,separator, callbackRequest);  
}

function callbackRequest(result : any){
  const res = JSON.parse(result);

  if (res.status === "200") {
    utils.default.doAlert("success","Base sent, you can found it in My database !");
  }
  else {
    utils.default.doAlert("danger",res.message);
  }
}

  return (
    <div className="Upload">
        <div className="view" id="view">
          
        <div id="drop-area">
          <form className="my-form">
            <p>Please drag and drop a database or click on the button below <br /><br />(extensions accepted .csv, .xlsx,.xls, .json or .txt)</p>
            <input type="file" id="fileElem" accept=".csv,.json,.txt,.xlsx,.xls" onChange={handleFiles}></input>
            <label className="button" htmlFor="fileElem">Select some files</label>
          </form>
            <p className="nameFile" id="nameFile"></p> 
        </div> 
        
        <div className="sendFile">
          <input type="text" className="inputName" id="inputName" placeholder="Database name..."></input>
          <button className="sendButton" onClick={sendFile}>Send</button>
        </div>
        <div id="separatorSelector" className="separatorSelector">
          Separator for CSV : <select name="separator" id="separator" defaultValue={","} disabled>
            <option value=",">' , ' : comma</option>
            <option value=";">' ; ' : semicolon</option>
            <option value="|">' | ' : pipe</option>
            <option value="/">' / ' : slash</option>
            <option value="\">' \ ' : backslash</option>
            <option value=":">' : ' : colon</option>
            <option value=" ">' &nbsp; ' : blank space</option>
          </select>
        </div>
        
        </div>
        
        <BarreLaterale />
        <Navigation />
        
      </div>
  );
}

export default Upload;