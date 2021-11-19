import BarreLaterale from "../components/BarreLaterale";
import Navigation from "../components/Navigation";

const Upload = () => { 
  let files : any;
  window.onload=function(){
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

function preventDefaults (e:any) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e :any) {
  dropArea?.classList.add('highlight')
}

function unhighlight(e:any) {
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
  }
}
function sendFile(){
  var name = (document.getElementById('inputName') as HTMLInputElement);
  if(files){
    if(name.value !== ""){
      uploadFile(files)
      setMsg("Base envoyée",'green');
    }else{
      setMsg("Veuillez donner un nom à la nouvelle base de données",'rgb(194, 22, 22)');
  }}else{
    setMsg("Veuillez déposer une base de données",'rgb(194, 22, 22)');
  }
}

function setMsg(msg:string,color:string){
  (document.getElementById("msg")as HTMLInputElement).style.color = color;
    (document.getElementById("msg")as HTMLInputElement).innerHTML= msg;
}


function uploadFile(file:any) {
  var url = 'http://localhost:4000/upload'
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')


  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
    }
    else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Error. Inform the user
    }
  })

  formData.append('upload_preset', 'ujpu6gyk')
  formData.append('file', file)
  xhr.send(formData)
}

  return (
    <div className="Upload">
        <div className="view">
        <div id="drop-area">
          <form className="my-form">
            <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
            <input type="file" id="fileElem" accept="image/*" onChange={handleFiles}></input>
            <label className="button" htmlFor="fileElem">Select some files</label>
          </form>
            <p className="nameFile" id="nameFile"></p> 
        </div> 
        <div className="sendFile">
          <input type="text" className="inputName" id="inputName" placeholder="Database name..."></input>
          <button className="sendButton" onClick={sendFile}>Send</button>
        </div>
        <span className="msg" id="msg"></span> 
        </div>
        
        <BarreLaterale />
        <Navigation />
        
      </div>
  );
}

export default Upload;